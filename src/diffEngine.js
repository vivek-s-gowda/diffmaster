// day-06-diffmaster/src/diffEngine.js
// High-performance Line and Token Diff Engine with Git Patch generation

export class DiffEngine {
  // Longest Common Subsequence (LCS) matrix
  static computeLCS(arr1, arr2) {
    const m = arr1.length;
    const n = arr2.length;
    const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (arr1[i] === arr2[j]) {
          dp[i + 1][j + 1] = dp[i][j] + 1;
        } else {
          dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
      }
    }
    return dp;
  }

  // Backtrack LCS to produce diff operations
  static diffLines(text1, text2, options = { ignoreWhitespace: false }) {
    let lines1 = (text1 || '').split('\n');
    let lines2 = (text2 || '').split('\n');

    const norm = (str) => options.ignoreWhitespace ? str.trim().replace(/\s+/g, ' ') : str;

    const norm1 = lines1.map(norm);
    const norm2 = lines2.map(norm);

    const dp = this.computeLCS(norm1, norm2);
    let i = lines1.length;
    let j = lines2.length;

    const rawDiff = [];
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && norm1[i - 1] === norm2[j - 1]) {
        rawDiff.unshift({ type: 'unchanged', text: lines1[i - 1], line1: i, line2: j });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        rawDiff.unshift({ type: 'added', text: lines2[j - 1], line2: j });
        j--;
      } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
        rawDiff.unshift({ type: 'deleted', text: lines1[i - 1], line1: i });
        i--;
      }
    }

    // Align side-by-side rows
    const sideBySide = [];
    let lineNum1 = 1;
    let lineNum2 = 1;

    for (let k = 0; k < rawDiff.length; k++) {
      const item = rawDiff[k];
      if (item.type === 'unchanged') {
        sideBySide.push({
          left: { line: lineNum1++, text: item.text, type: 'unchanged' },
          right: { line: lineNum2++, text: item.text, type: 'unchanged' }
        });
      } else if (item.type === 'deleted') {
        // Look ahead for modified match (adjacent delete + add)
        const next = rawDiff[k + 1];
        if (next && next.type === 'added') {
          const tokens = this.diffTokens(item.text, next.text);
          sideBySide.push({
            left: { line: lineNum1++, text: item.text, type: 'modified', tokens: tokens.left },
            right: { line: lineNum2++, text: next.text, type: 'modified', tokens: tokens.right }
          });
          k++; // skip next
        } else {
          sideBySide.push({
            left: { line: lineNum1++, text: item.text, type: 'deleted' },
            right: null
          });
        }
      } else if (item.type === 'added') {
        sideBySide.push({
          left: null,
          right: { line: lineNum2++, text: item.text, type: 'added' }
        });
      }
    }

    // Compute stats
    let additions = 0;
    let deletions = 0;
    let modifications = 0;

    for (const row of sideBySide) {
      if (row.left?.type === 'modified') modifications++;
      else if (row.left && !row.right) deletions++;
      else if (!row.left && row.right) additions++;
    }

    return {
      rawDiff,
      sideBySide,
      stats: {
        additions,
        deletions,
        modifications,
        totalLines: sideBySide.length
      }
    };
  }

  // Token-level difference for modified lines
  static diffTokens(str1, str2) {
    const tokens1 = str1.match(/\w+|\s+|[^\w\s]/g) || [str1];
    const tokens2 = str2.match(/\w+|\s+|[^\w\s]/g) || [str2];

    const dp = this.computeLCS(tokens1, tokens2);
    let i = tokens1.length;
    let j = tokens2.length;

    const leftTokens = [];
    const rightTokens = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && tokens1[i - 1] === tokens2[j - 1]) {
        leftTokens.unshift({ text: tokens1[i - 1], type: 'same' });
        rightTokens.unshift({ text: tokens2[j - 1], type: 'same' });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        rightTokens.unshift({ text: tokens2[j - 1], type: 'added' });
        j--;
      } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
        leftTokens.unshift({ text: tokens1[i - 1], type: 'deleted' });
        i--;
      }
    }

    return { left: leftTokens, right: rightTokens };
  }

  // Generate Git Patch format (.patch / .diff)
  static toGitPatch(filename, originalText, modifiedText) {
    const diff = this.diffLines(originalText, modifiedText);
    const dateStr = new Date().toISOString();
    const lines = [
      `--- a/${filename}\t${dateStr}`,
      `+++ b/${filename}\t${dateStr}`,
      `@@ -1,${(originalText.split('\n')).length} +1,${(modifiedText.split('\n')).length} @@`
    ];

    for (const item of diff.rawDiff) {
      if (item.type === 'unchanged') lines.push(` ${item.text}`);
      else if (item.type === 'added') lines.push(`+${item.text}`);
      else if (item.type === 'deleted') lines.push(`-${item.text}`);
    }

    return lines.join('\n');
  }
}

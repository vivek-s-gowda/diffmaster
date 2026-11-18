// day-06-diffmaster/tests/diffEngine.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { DiffEngine } from '../src/diffEngine.js';

test('DiffEngine: Identifies additions, deletions and unchanged lines', () => {
  const text1 = 'line 1\nline 2\nline 3';
  const text2 = 'line 1\nline 2 (modified)\nline 3\nline 4 (added)';

  const result = DiffEngine.diffLines(text1, text2);
  assert.ok(result.stats.totalLines >= 3);
  assert.ok(result.stats.additions > 0 || result.stats.modifications > 0);
});

test('DiffEngine: Computes inline token diff for modified lines', () => {
  const line1 = 'const maxTimeout = 5000;';
  const line2 = 'const maxTimeout = 10000;';

  const tokens = DiffEngine.diffTokens(line1, line2);
  assert.ok(tokens.left.some(t => t.text === '5000' && t.type === 'deleted'));
  assert.ok(tokens.right.some(t => t.text === '10000' && t.type === 'added'));
});

test('DiffEngine: Generates valid Git Patch string', () => {
  const patch = DiffEngine.toGitPatch('index.js', 'console.log("hello");', 'console.log("world");');
  assert.match(patch, /^--- a\/index\.js/);
  assert.match(patch, /\+\+\+ b\/index\.js/);
  assert.match(patch, /-\s*console\.log\("hello"\);/);
  assert.match(patch, /\+\s*console\.log\("world"\);/);
});

// day-06-diffmaster/src/jsonDiff.js
// Semantic structural JSON object diffing engine

export class JsonDiffer {
  static flattenObject(obj, prefix = '') {
    const result = {};
    if (obj === null || typeof obj !== 'object') {
      result[prefix] = obj;
      return result;
    }

    for (const [key, val] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        Object.assign(result, this.flattenObject(val, path));
      } else {
        result[path] = val;
      }
    }
    return result;
  }

  static diff(json1, json2) {
    let obj1 = json1;
    let obj2 = json2;

    if (typeof json1 === 'string') {
      try { obj1 = JSON.parse(json1); } catch { return { error: 'Invalid JSON in left operand' }; }
    }
    if (typeof json2 === 'string') {
      try { obj2 = JSON.parse(json2); } catch { return { error: 'Invalid JSON in right operand' }; }
    }

    const flat1 = this.flattenObject(obj1);
    const flat2 = this.flattenObject(obj2);

    const allKeys = Array.from(new Set([...Object.keys(flat1), ...Object.keys(flat2)])).sort();
    const changes = [];

    let added = 0;
    let removed = 0;
    let modified = 0;
    let unchanged = 0;

    for (const key of allKeys) {
      const has1 = Object.prototype.hasOwnProperty.call(flat1, key);
      const has2 = Object.prototype.hasOwnProperty.call(flat2, key);

      if (!has1 && has2) {
        added++;
        changes.push({ key, type: 'added', oldVal: undefined, newVal: flat2[key] });
      } else if (has1 && !has2) {
        removed++;
        changes.push({ key, type: 'removed', oldVal: flat1[key], newVal: undefined });
      } else {
        const val1 = flat1[key];
        const val2 = flat2[key];

        const str1 = JSON.stringify(val1);
        const str2 = JSON.stringify(val2);

        if (str1 !== str2) {
          const type1 = typeof val1;
          const type2 = typeof val2;
          const isTypeMismatch = type1 !== type2;

          modified++;
          changes.push({
            key,
            type: isTypeMismatch ? 'type_changed' : 'modified',
            oldVal: val1,
            newVal: val2,
            oldType: type1,
            newType: type2
          });
        } else {
          unchanged++;
          changes.push({ key, type: 'unchanged', oldVal: val1, newVal: val2 });
        }
      }
    }

    return {
      valid: true,
      changes,
      stats: { added, removed, modified, unchanged, totalKeys: allKeys.length }
    };
  }
}

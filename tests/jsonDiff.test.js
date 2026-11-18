// day-06-diffmaster/tests/jsonDiff.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { JsonDiffer } from '../src/jsonDiff.js';

test('JsonDiffer: Detects key additions and deletions', () => {
  const json1 = JSON.stringify({ name: 'DiffMaster', version: '1.0.0' });
  const json2 = JSON.stringify({ name: 'DiffMaster', license: 'MIT' });

  const diff = JsonDiffer.diff(json1, json2);
  assert.equal(diff.valid, true);
  assert.equal(diff.stats.added, 1);
  assert.equal(diff.stats.removed, 1);
  assert.equal(diff.stats.unchanged, 1);

  const addedChange = diff.changes.find(c => c.key === 'license');
  assert.ok(addedChange && addedChange.type === 'added');

  const removedChange = diff.changes.find(c => c.key === 'version');
  assert.ok(removedChange && removedChange.type === 'removed');
});

test('JsonDiffer: Detects value modification and type changes', () => {
  const json1 = JSON.stringify({ count: 42, active: 'true' });
  const json2 = JSON.stringify({ count: 99, active: true });

  const diff = JsonDiffer.diff(json1, json2);
  assert.equal(diff.valid, true);
  assert.equal(diff.stats.modified, 2);

  const countChange = diff.changes.find(c => c.key === 'count');
  assert.equal(countChange.type, 'modified');
  assert.equal(countChange.oldVal, 42);
  assert.equal(countChange.newVal, 99);

  const activeChange = diff.changes.find(c => c.key === 'active');
  assert.equal(activeChange.type, 'type_changed');
  assert.equal(activeChange.oldType, 'string');
  assert.equal(activeChange.newType, 'boolean');
});

test('JsonDiffer: Flattens nested objects properly', () => {
  const json1 = { database: { host: 'localhost', port: 5432 } };
  const json2 = { database: { host: 'db.internal', port: 5432 } };

  const diff = JsonDiffer.diff(json1, json2);
  assert.equal(diff.valid, true);
  const hostChange = diff.changes.find(c => c.key === 'database.host');
  assert.ok(hostChange && hostChange.type === 'modified');
  assert.equal(hostChange.newVal, 'db.internal');
});

test('JsonDiffer: Gracefully handles invalid JSON', () => {
  const diff = JsonDiffer.diff('{ broken json', '{}');
  assert.ok(diff.error);
});

// day-06-diffmaster/tests/threeWayMerge.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { ThreeWayMerger } from '../src/threeWayMerge.js';

test('ThreeWayMerger: Clean merge when only incoming changes', () => {
  const base = 'line 1\nline 2\nline 3';
  const current = 'line 1\nline 2\nline 3';
  const incoming = 'line 1\nline 2 modified\nline 3';

  const res = ThreeWayMerger.merge(base, current, incoming);
  assert.equal(res.hasConflicts, false);
  assert.equal(res.conflictCount, 0);

  const resolved = ThreeWayMerger.resolveMergedText(res.hunks);
  assert.equal(resolved, incoming);
});

test('ThreeWayMerger: Detects conflict when both current and incoming modify same line differently', () => {
  const base = 'timeout = 1000;';
  const current = 'timeout = 2000;';
  const incoming = 'timeout = 5000;';

  const res = ThreeWayMerger.merge(base, current, incoming);
  assert.equal(res.hasConflicts, true);
  assert.equal(res.conflictCount, 1);
  assert.equal(res.hunks[0].type, 'conflict');
  assert.equal(res.hunks[0].current, current);
  assert.equal(res.hunks[0].incoming, incoming);
});

test('ThreeWayMerger: Resolves conflicts using current, incoming, or both', () => {
  const base = 'value';
  const current = 'value_current';
  const incoming = 'value_incoming';

  const res = ThreeWayMerger.merge(base, current, incoming);
  assert.equal(res.conflictCount, 1);

  // Unresolved contains git markers
  const unresolved = ThreeWayMerger.resolveMergedText(res.hunks);
  assert.ok(unresolved.includes('<<<<<<< CURRENT'));
  assert.ok(unresolved.includes('======='));
  assert.ok(unresolved.includes('>>>>>>> INCOMING'));

  // Resolve with current
  res.hunks[0].resolution = 'current';
  assert.equal(ThreeWayMerger.resolveMergedText(res.hunks), 'value_current');

  // Resolve with incoming
  res.hunks[0].resolution = 'incoming';
  assert.equal(ThreeWayMerger.resolveMergedText(res.hunks), 'value_incoming');

  // Resolve with both
  res.hunks[0].resolution = 'both';
  assert.equal(ThreeWayMerger.resolveMergedText(res.hunks), 'value_current\nvalue_incoming');
});

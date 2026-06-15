const test = require('node:test');
const assert = require('node:assert');
const { buildPlayback, resolveSound, SYSTEM_SOUNDS } = require('../scripts/play.js');

test('win32 builds a PowerShell SoundPlayer command', () => {
  const pb = buildPlayback('win32', 'C:\\Windows\\Media\\chimes.wav');
  assert.strictEqual(pb.command, 'powershell');
  assert.ok(pb.args.includes('-NoProfile'));
  assert.ok(pb.args.some(a => a.includes('SoundPlayer') && a.includes('chimes.wav')));
});

test('darwin uses afplay', () => {
  const pb = buildPlayback('darwin', '/System/Library/Sounds/Glass.aiff');
  assert.deepStrictEqual(pb, { command: 'afplay', args: ['/System/Library/Sounds/Glass.aiff'] });
});

test('linux uses paplay, fallback uses aplay', () => {
  assert.strictEqual(buildPlayback('linux', '/s.oga').command, 'paplay');
  assert.strictEqual(buildPlayback('linux', '/s.oga', true).command, 'aplay');
});

test('unsupported platform returns null', () => {
  assert.strictEqual(buildPlayback('freebsd', '/s.wav'), null);
});

test('resolveSound prefers override, then system default, then null', () => {
  assert.strictEqual(resolveSound('win32', 'X.wav'), 'X.wav');
  assert.strictEqual(resolveSound('darwin', undefined), SYSTEM_SOUNDS.darwin);
  assert.strictEqual(resolveSound('freebsd', undefined), null);
});

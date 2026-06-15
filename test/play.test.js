const test = require('node:test');
const assert = require('node:assert');
const { buildPlayback, resolveSound, SYSTEM_SOUNDS } = require('../scripts/play.js');

test('win32 builds a PowerShell SoundPlayer command', () => {
  assert.deepStrictEqual(buildPlayback('win32', 'C:\\Windows\\Media\\chimes.wav'), {
    command: 'powershell',
    args: ['-NoProfile', '-Command',
      "(New-Object System.Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()"],
  });
});

test('win32 escapes single quotes in the path', () => {
  const pb = buildPlayback('win32', "C:\\Users\\O'Brien\\alert.wav");
  assert.ok(pb.args[2].includes("O''Brien"));
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

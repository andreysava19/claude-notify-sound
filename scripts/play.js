'use strict';
const { spawn } = require('child_process');

const SYSTEM_SOUNDS = {
  win32: 'C:\\Windows\\Media\\chimes.wav',
  darwin: '/System/Library/Sounds/Glass.aiff',
  linux: '/usr/share/sounds/freedesktop/stereo/complete.oga',
};

function resolveSound(platform, override) {
  return override || SYSTEM_SOUNDS[platform] || null;
}

function buildPlayback(platform, sound, fallback = false) {
  switch (platform) {
    case 'win32':
      return {
        command: 'powershell',
        args: ['-NoProfile', '-Command',
          `(New-Object System.Media.SoundPlayer '${sound}').PlaySync()`],
      };
    case 'darwin':
      return { command: 'afplay', args: [sound] };
    case 'linux':
      return fallback
        ? { command: 'aplay', args: [sound] }
        : { command: 'paplay', args: [sound] };
    default:
      return null;
  }
}

function play(platform, override) {
  const sound = resolveSound(platform, override);
  if (!sound) return; // unsupported platform: silent no-op
  const pb = buildPlayback(platform, sound);
  if (!pb) return;
  try {
    const child = spawn(pb.command, pb.args, { stdio: 'ignore' });
    child.on('error', () => {
      if (platform !== 'linux') return; // fail silently
      const fb = buildPlayback(platform, sound, true); // try aplay
      try {
        const c2 = spawn(fb.command, fb.args, { stdio: 'ignore' });
        c2.on('error', () => {});
      } catch (_) { /* silent */ }
    });
  } catch (_) { /* silent */ }
}

if (require.main === module) {
  // process.argv[2] is the event name (stop|notification); v1 uses one sound for all.
  play(process.platform, process.env.CLAUDE_NOTIFY_SOUND);
}

module.exports = { SYSTEM_SOUNDS, resolveSound, buildPlayback, play };

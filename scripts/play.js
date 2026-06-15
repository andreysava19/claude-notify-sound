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

module.exports = { SYSTEM_SOUNDS, resolveSound, buildPlayback };

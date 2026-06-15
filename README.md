# claude-notify-sound

Cross-platform notification sound on Claude Code `Stop` and `Notification` hooks.

## Install

```
/plugin marketplace add <git-url-of-this-repo>
/plugin install claude-notify-sound@clg-internal
```

After installing, run `/hooks` to confirm that both `Notification` and `Stop` are listed with an active hook entry.

## Custom sound

Set the `CLAUDE_NOTIFY_SOUND` environment variable to the path of any `.wav` (Windows), `.aiff` (macOS), or `.oga` (Linux) file to override the default system sound:

```
CLAUDE_NOTIFY_SOUND=/path/to/my-sound.wav
```

## Notes

- Requires **Node.js** on `PATH`.
- The terminal CLI (`node scripts/play.js`) is verified working on Windows, macOS, and Linux.
- VS Code extension behavior may differ from the terminal CLI; test it manually before relying on it in that environment.

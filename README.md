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

## Verification

- **Terminal CLI:** both `Stop` and `Notification` hooks fire — sound plays on finish and on questions/permission prompts. ✅
- **VS Code extension:** the `Stop` hook fires (sound on finish ✅), but the `Notification` hook does **not** fire (no sound on questions / permission prompts ❌). This is a known parity bug in the VS Code extension — it shows permission prompts through its own native UI and does not emit `Notification` hook events (Claude Code issues [#28774](https://github.com/anthropics/claude-code/issues/28774), [#59718](https://github.com/anthropics/claude-code/issues/59718), [#31285](https://github.com/anthropics/claude-code/issues/31285)). No in-extension workaround exists. **Workaround:** run Claude Code in VS Code's integrated terminal instead of the extension to get the `Notification` sound.

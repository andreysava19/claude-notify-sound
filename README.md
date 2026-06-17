# claude-notify-sound

Cross-platform notification sound on Claude Code `Stop` and `Notification` hooks.
Plays a sound when Claude Code finishes a turn or asks for a question/permission.

> **Terminal CLI only.** These instructions are for the standalone Claude Code
> CLI run in a terminal. The VS Code extension's graphical plugin installer is
> not covered here — install and run this plugin from the terminal CLI.

## Requirements

- The **standalone Claude Code CLI** installed and runnable as `claude` in your
  terminal. Check with:
  ```
  claude --version
  ```
  If `claude` is not found, install the CLI first (see the Claude Code setup
  docs), then continue.
- **Node.js** available on your `PATH`. Check with:
  ```
  node --version
  ```

## Install

Run these inside Claude Code **in a terminal**:

```
/plugin marketplace add andreysava19/claude-notify-sound
/plugin install claude-notify-sound@clg-internal
```

Then confirm the hooks loaded:

```
/hooks
```

You should see both `Notification` and `Stop` listed with an active hook entry.
Restart Claude Code, then finish a turn — you should hear a sound.

> If `/plugin` is reported as not found, your CLI is outdated. Update it with
> `claude update` and run the install commands again.

## Custom sound

Set the `CLAUDE_NOTIFY_SOUND` environment variable to the path of any `.wav`
(Windows), `.aiff` (macOS), or `.oga` (Linux) file to override the default
system sound:

```
CLAUDE_NOTIFY_SOUND=/path/to/my-sound.wav
```

## Notes

- Requires **Node.js** on `PATH`.
- Verified working in the terminal CLI on Windows, macOS, and Linux: both the
  `Stop` and `Notification` hooks fire (sound on finish and on
  questions/permission prompts).
- Default system sounds: Windows `chimes.wav`, macOS `Glass.aiff`,
  Linux `complete.oga`.
</content>
</invoke>

# Muteblind — Invent a Word We Need

[![competition](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0.svg)](https://make.fun/bounty/u-deranalabs-invent-a-word-we-need-17a020e0)
[![rank](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0/prosky1/u-deranalabs-invent-a-word-we-need-17a020e0-entry/rank.svg)](https://make.fun/bounty/u-deranalabs-invent-a-word-we-need-17a020e0)
[![reward](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0/prosky1/u-deranalabs-invent-a-word-we-need-17a020e0-entry/reward.svg)](https://make.fun/bounty/u-deranalabs-invent-a-word-we-need-17a020e0)

Entry for the [Invent a Word We Need](https://make.fun/bounty/u-deranalabs-invent-a-word-we-need-17a020e0) bounty on make.fun.

## The entry

> Muteblind (n.) — delivering a full speech before noticing you were on mute.

One invented English word, defined in a single clear line (75 characters).

## How it works

`main.ts` writes the entry text verbatim to `/output/entry.txt`. It validates
the text first (1–140 characters, single line, not only whitespace), then reads
the file back to confirm the bytes on disk match the entry exactly.

Run locally:

```sh
node main.ts
```

# Summary

- [Summary](#summary)
- [Interactive-video-player](#interactive-video-player)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage Exemple](#usage-exemple)

# Interactive-video-player

## Description

The `interactive-video-player` package is a _custom component_ using _shadowDOM_ properties embedable in html. This library include a video player allowing the user to switch between multiple video sequence based on textual choicie made by the user presented to him at each ends of a video sequence.

This library allow to quickly create video games like for exemple [Super Seducer](https://store.steampowered.com/app/695920/Super_Seducer__How_to_Talk_to_Girls/) by providing a scenario object directly to the video player.

## Installation

```bash
npm i @shammas44/interactive-video-player
```

## Usage Exemple

First import the `Player` class in your script to make the `app-player` custom element available.

```typescript
// index.ts
import {
  Player as PlayerElement,
  Project,
  VideoNode
} from "@shammas44/interactive-video-player";
```

Then include it in your html using the `app-player` custom element tag

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script defer type="module" src="index.ts"></script>
</head>
<body>
  <!-- insert your video player -->
  <app-player></app-player>
</body>
</html>
```

To configure your player you need to call the method `initProject` with a valid project from `Project` type as argument

```typescript
// index.ts
const videos: VideoNode[] = [
  {
    id: "1",
    name: "video1",
    paths: ["video/video1-desktop.mp4", "video/video1-mobile.mp4"],
    animation: {
      title: "Which Video sequence would you watch now ?",
      duration: 10,
      position: InteractionPosition.BOTTOM,
    },
    interactions: [
      { id: "2", content: "video 2" },
      { id: "3", content: "video 3" },
    ],
  },
  {
    id: "2",
    name: "video2",
    paths: ["video/video2-desktop.mp4", "video/video2-mobile.mp4"],
    animation: {
      title: "Which Video sequence would you watch now ?",
      duration: 10,
      position: InteractionPosition.BOTTOM,
    },
  },
  {
    id: "3",
    name: "",
    paths: ["money.mp4", "money.mp4"],
  },
];

const project: Project = {
  id: "1",
  entrypointId: "1",
  videos: videos,
};

const player: PlayerElement | null = document.querySelector("app-player");
if (player != null) {
  player.initProject(project);
}
```

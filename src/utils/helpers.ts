import { VideoNode } from "../models/project";

export function randomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function videoToMap(videos: VideoNode[]): Map<string, VideoNode> {
  const map = new Map();
  videos.forEach((video) => {
    map.set(video.id, video);
  });
  return map;
}

export function mapBetween(
  currentNum: number,
  minAllowed: number,
  maxAllowed: number,
  min: number,
  max: number
) {
  return (
    ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed
  );
}

export function percentageBetween(value: number, min: number, max: number) {
  return mapBetween(value, 0, 100, min, max);
}

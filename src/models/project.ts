export enum InteractionPosition {
  FULL = "FULL",
  BOTTOM = "BOTTOM",
}

export type Interaction = {
  content: string;
  id: string;
};

export type Animation = {
  duration: number;
  position: InteractionPosition;
  title?: string;
};

export type VideoNode = {
  id: string;
  name: string;
  paths: [string, string];
  animation?: Animation;
  interactions?: Interaction[];
};

export type Project = {
  id: string;
  entrypointId: string;
  videos: VideoNode[];
};

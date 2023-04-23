export type Interaction = {
  content: string;
  id: string;
};

export type VideoNode = {
  id: string;
  name: string;
  paths: [string, string];
  interactions?: Interaction[];
};

export type Project = {
  id: string;
  entrypointId: string;
  videos: VideoNode[];
};

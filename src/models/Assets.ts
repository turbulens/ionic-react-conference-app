export interface Assets {
  date: string;
  groups: VideoGroup[]
}

export interface VideoGroup {
  time: string;
  videos: Video[];
}

export interface Video {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  serverNames: string[];
  tracks: string[];
}

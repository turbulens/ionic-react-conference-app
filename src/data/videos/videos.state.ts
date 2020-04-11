import { Server } from '../../models/Server';
import { Assets, Video } from '../../models/Assets';
export interface AssetsState {
  assets: Assets;
  videos: Video[];
  servers: Server[];
  favoris: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}

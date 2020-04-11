import { getConfData } from '../dataApi';
import { ActionType } from '../../util/types';
import { AssetsState } from './videos.state';

export const loadAssetsData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getConfData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-conf-loading',
  isLoading
} as const);

export const setData = (data: Partial<AssetsState>) => ({
  type: 'set-conf-data',
  data
} as const);

export const addFavori = (videoId: number) => ({
  type: 'add-favori',
  videoId
} as const);

export const removeFavori = (videoId: number) => ({
  type: 'remove-favori',
  videoId
} as const);

export const updateFilteredTracks = (filteredTracks: string[]) => ({
  type: 'update-filtered-tracks', 
  filteredTracks 
} as const);

export const setSearchText = (searchText?: string) => ({ 
  type: 'set-search-text', 
  searchText 
} as const);

export const setMenuEnabled = (menuEnabled: boolean) => ({ 
  type: 'set-menu-enabled', 
  menuEnabled
} as const);

export type VideosActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof addFavori>
  | ActionType<typeof removeFavori>
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchText>
  | ActionType<typeof setMenuEnabled>

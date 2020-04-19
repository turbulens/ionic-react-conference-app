import { getApplData } from '../dataApi';
import { ActionType } from '../../util/types';
import { ApplState } from './appl.state';

export const loadApplData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getApplData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-conf-loading',
  isLoading
} as const);

export const setData = (data: Partial<ApplState>) => ({
  type: 'set-conf-data',
  data
} as const);

export const addFavorite = (notificationId: number) => ({
  type: 'add-favorite',
  notificationId
} as const);

export const removeFavorite = (notificationId: number) => ({
  type: 'remove-favorite',
  notificationId
} as const);

export const updateFilteredTags = (filteredTags: string[]) => ({
  type: 'update-filtered-tags', 
  filteredTags 
} as const);

export const setSearchText = (searchText?: string) => ({ 
  type: 'set-search-text', 
  searchText 
} as const);

export const setMenuEnabled = (menuEnabled: boolean) => ({ 
  type: 'set-menu-enabled', 
  menuEnabled
} as const);

export type NotificationsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>
  | ActionType<typeof updateFilteredTags>
  | ActionType<typeof setSearchText>
  | ActionType<typeof setMenuEnabled>

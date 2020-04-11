import { combineReducers } from './combineReducers';
import { videosReducer } from './videos/videos.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    assets: { groups: [] } as any,
    videos: [],
    servers: [],
    favoris: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    loading: false,
    menuEnabled: true
  },
  user: {
    darkMode: true,
    isLoggedin: false,
    loading: false
  }
};

export const reducers = combineReducers({
  data: videosReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;
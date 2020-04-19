import { combineReducers } from './combineReducers';
import { notificationsReducer } from './notifications/notifications.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    planification: { groups: [] } as any,
    notifications: [],
    assets: [],
    favoris: [],
    locations: [],
    allTags: [],
    filteredTags: [],
    mapCenterId: 0,
    loading: false,
    menuEnabled: true
  },
  user: {
    hasSeenInformation: true,
    darkMode: true,
    isLoggedin: false,
    loading: false
  }
};

export const reducers = combineReducers({
  data: notificationsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;
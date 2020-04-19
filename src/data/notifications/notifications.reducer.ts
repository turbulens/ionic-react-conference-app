import { NotificationsActions } from './notifications.actions';
import { ApplState } from './appl.state';

export const notificationsReducer = (state: ApplState, action: NotificationsActions): ApplState => {
  switch (action.type) {
    case 'set-conf-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-conf-data': {
      return { ...state, ...action.data };
    }
    case 'add-favorite': {
      return { ...state, favoris: [...(state.favoris), action.notificationId] };
    }
    case 'remove-favorite': {
      return { ...state, favoris: [...(state.favoris).filter(x => x !== action.notificationId)] };
    }
    case 'update-filtered-tags': {
      return { ...state, filteredTags: action.filteredTags };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
}
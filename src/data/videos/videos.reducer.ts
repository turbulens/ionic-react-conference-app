import { VideosActions } from './videos.actions';
import { AssetsState } from './videos.state';

export const videosReducer = (state: AssetsState, action: VideosActions): AssetsState => {
  switch (action.type) {
    case 'set-conf-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-conf-data': {
      return { ...state, ...action.data };
    }
    case 'add-favori': {
      return { ...state, favoris: [...(state.favoris), action.videoId] };
    }
    case 'remove-favori': {
      return { ...state, favoris: [...(state.favoris).filter(x => x !== action.videoId)] };
    }
    case 'update-filtered-tracks': {
      return { ...state, filteredTracks: action.filteredTracks };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
}
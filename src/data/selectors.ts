import { createSelector } from 'reselect';
import { Assets, Video, VideoGroup } from '../models/Assets';
import { AppState } from './state';

const getAssets = (state: AppState) => {

  return state.data.assets
};
export const getServers = (state: AppState) => state.data.servers;
const getVideos = (state: AppState) => state.data.videos;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriIds = (state: AppState) => state.data.favoris;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredAssets = createSelector(
  getAssets, getFilteredTracks,
  (assets, filteredTracks) => {
    const groups: VideoGroup[] = [];
    assets.groups.forEach(group => {
      const videos: Video[] = [];
      group.videos.forEach(video => {
        video.tracks.forEach(track => {
          if (filteredTracks.indexOf(track) > -1) {
            videos.push(video);
          }
        })
      })
      if (videos.length) {
        const groupToAdd: VideoGroup = {
          time: group.time,
          videos
        }
        groups.push(groupToAdd);
      }
    });

    return {
      date: assets.date,
      groups
    } as Assets;
  }
);

export const getSearchedAssets = createSelector(
  getFilteredAssets, getSearchText,
  (assets, searchText) => {
    if (!searchText) {
      return assets;
    }
    const groups: VideoGroup[] = [];
    assets.groups.forEach(group => {

      const videos = group.videos.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (videos.length) {
        const groupToAdd: VideoGroup = {
          time: group.time,
          videos
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: assets.date,
      groups
    } as Assets;
  }
)

export const getAssetsList = createSelector(
  getSearchedAssets,
  (assets) => assets
);

export const getGroupedFavoris = createSelector(
  getAssetsList, getFavoriIds,
  (assets, favoriIds) => {
    const groups: VideoGroup[] = [];
    assets.groups.forEach(group => {
      const videos = group.videos.filter(s => favoriIds.indexOf(s.id) > -1)
      if (videos.length) {
        const groupToAdd: VideoGroup = {
          time: group.time,
          videos
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: assets.date,
      groups
    } as Assets;
  }
);


const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getVideo = createSelector(
  getVideos, getIdParam,
  (videos, id) => {
    return videos.find(s => s.id === id);
  }
);

export const getServer = createSelector(
  getServers, getIdParam,
  (servers, id) => servers.find(x => x.id === id)
);

export const getServerVideos = createSelector(
  getVideos,
  (videos) => {
    const serverVideos: { [key: string]: Video[] } = {};

    videos.forEach(video => {
      video.serverNames && video.serverNames.forEach(name => {
        if (serverVideos[name]) {
          serverVideos[name].push(video);
        } else {
          serverVideos[name] = [video];
        }
      })
    });
    return serverVideos;
  }
);

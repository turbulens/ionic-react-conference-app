import { Plugins } from '@capacitor/core';
import { Assets, Video } from '../models/Assets';
import { Server } from '../models/Server';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const USERNAME = 'username';
const DARKMODE = 'darkMode';

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),]);
  const responseData = await response[0].json();
  const assets = responseData.assets[0] as Assets;
  const videos = parseVideos(assets);
  const servers = responseData.servers as Server[];
  const allTracks = videos
    .reduce((all, video) => all.concat(video.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    assets,
    videos,
    servers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: DARKMODE }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const darkMode = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const data = {
    isLoggedin,
    darkMode,
    username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setDarkmodeData = async (darkMode: boolean) => {
  await Storage.set({ key: DARKMODE, value: JSON.stringify(darkMode) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

function parseVideos(assets: Assets) {
  const videos: Video[] = [];
  assets.groups.forEach(g => {
    g.videos.forEach(s => videos.push(s))
  });
  return videos;
}

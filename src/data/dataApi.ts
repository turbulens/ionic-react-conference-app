import { Plugins } from '@capacitor/core';
import { Planification, Notification } from '../models/Planification';
import { Asset } from '../models/Asset';
import { Location } from '../models/Location';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenInformation';
const UTILISATEUR = 'utilisateur';
const DARKMODE = 'darkMode';

export const getApplData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)]);
  const responseData = await response[0].json();
  const planification = responseData.planification[0] as Planification;
  const notifications = parseNotifications(planification);
  const assets = responseData.assets as Asset[];
  const locations = await response[1].json() as Location[];
  const allTags = notifications
    .reduce((all, notification) => all.concat(notification.tags), [] as string[])
    .filter((tagName, index, array) => array.indexOf(tagName) === index)
    .sort();

  const data = {
    planification,
    notifications,
    locations,
    assets,
    allTags,
    filteredTags: [...allTags]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: DARKMODE }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: UTILISATEUR })]);
  const isLoggedin = await response[0].value === 'true';
  const darkMode = await response[1].value === 'true';
  const hasSeenInformation = await response[2].value === 'true';
  const utilisateur = await response[3].value || undefined;
  const data = {
    isLoggedin,
    darkMode,
    hasSeenInformation,
    utilisateur
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setDarkmodeData = async (darkMode: boolean) => {
  await Storage.set({ key: DARKMODE, value: JSON.stringify(darkMode) });
}

export const setHasSeenInformationData = async (hasSeenInformation: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenInformation) });
}

export const setUtilisateurData = async (utilisateur?: string) => {
  if (!utilisateur) {
    await Storage.remove({ key: UTILISATEUR });
  } else {
    await Storage.set({ key: UTILISATEUR, value: utilisateur });
  }
}

function parseNotifications(planification: Planification) {
  const notifications: Notification[] = [];
  planification.groups.forEach(g => {
    g.notifications.forEach(s => notifications.push(s))
  });
  return notifications;
}

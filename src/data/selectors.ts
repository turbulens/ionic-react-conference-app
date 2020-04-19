import { createSelector } from 'reselect';
import { Planification, Notification, PlanificationGroup } from '../models/Planification';
import { AppState } from './state';

const getPlanification = (state: AppState) => {

  return state.data.planification
};
export const getAssets = (state: AppState) => state.data.assets;
const getNotifications = (state: AppState) => state.data.notifications;
const getFilteredTags = (state: AppState) => state.data.filteredTags;
const getFavoriteIds = (state: AppState) => state.data.favoris;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredPlanification = createSelector(
  getPlanification, getFilteredTags,
  (planification, filteredTags) => {
    const groups: PlanificationGroup[] = [];
    planification.groups.forEach(group => {
      const notifications: Notification[] = [];
      group.notifications.forEach(notification => {
        notification.tags.forEach(tag => {
          if (filteredTags.indexOf(tag) > -1) {
            notifications.push(notification);
          }
        })
      })
      if (notifications.length) {
        const groupToAdd: PlanificationGroup = {
          jour: group.jour,
          notifications
        }
        groups.push(groupToAdd);
      }
    });

    return {
      annee: planification.annee,
      groups
    } as Planification;
  }
);

export const getSearchedPlanification = createSelector(
  getFilteredPlanification, getSearchText,
  (planification, searchText) => {
    if (!searchText) {
      return planification;
    }
    const groups: PlanificationGroup[] = [];
    planification.groups.forEach(group => {

      const notifications = group.notifications.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (notifications.length) {
        const groupToAdd: PlanificationGroup = {
          jour: group.jour,
          notifications
        }
        groups.push(groupToAdd);
      }
    });
    return {
      annee: planification.annee,
      groups
    } as Planification;
  }
)

export const getPlanificationList = createSelector(
  getSearchedPlanification,
  (planification) => planification
);

export const getGroupedFavoris = createSelector(
  getPlanificationList, getFavoriteIds,
  (planification, favoriteIds) => {
    const groups: PlanificationGroup[] = [];
    planification.groups.forEach(group => {
      const notifications = group.notifications.filter(s => favoriteIds.indexOf(s.id) > -1)
      if (notifications.length) {
        const groupToAdd: PlanificationGroup = {
          jour: group.jour,
          notifications
        }
        groups.push(groupToAdd);
      }
    });
    return {
      annee: planification.annee,
      groups
    } as Planification;
  }
);


const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getNotification = createSelector(
  getNotifications, getIdParam,
  (notifications, id) => {
    return notifications.find(s => s.id === id);
  }
);

export const getAsset = createSelector(
  getAssets, getIdParam,
  (assets, id) => assets.find(x => x.id === id)
);

export const getAssetNotifications = createSelector(
  getNotifications,
  (notifications) => {
    const assetNotifications: { [key: string]: Notification[] } = {};

    notifications.forEach(notification => {
      notification.assetNames && notification.assetNames.forEach(name => {
        if (assetNotifications[name]) {
          assetNotifications[name].push(notification);
        } else {
          assetNotifications[name] = [notification];
        }
      })
    });
    return assetNotifications;
  }
);

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(l => l.id === state.data.mapCenterId);
  if (item == null) {
    return {
      id: 1,
      name: 'Carte Center',
      lat: 43.071584,
      lng: -89.380120
    };
  }
  return item;
}

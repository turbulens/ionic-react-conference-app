import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Notification } from '../models/Planification';

interface NotificationListItemProps {
  notification: Notification;
  listType: "tous" | "favoris";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const NotificationListItem: React.FC<NotificationListItemProps> = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, notification, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteNotification = () => {
    onAddFavorite(notification.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Annuler',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(notification.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteNotification = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteNotification();
    } else {
      // remember this notification as a user favorite
      onAddFavorite(notification.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'tag-' + notification.tags[0].toLowerCase()}>
      <IonItem routerLink={`/tabs/planification/${notification.id}`}>
        <IonLabel>
          <h3>{notification.name}</h3>
          <p>
            {notification.timeStart}&mdash;&nbsp;
            {notification.timeStart}&mdash;&nbsp;
            {notification.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === "favoris" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteNotification()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteNotification}>
            Favorite
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(NotificationListItem);
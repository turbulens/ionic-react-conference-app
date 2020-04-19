import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Planification, Notification } from '../models/Planification';
import NotificationListItem from './NotificationListItem';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/notifications/notifications.actions';

interface OwnProps {
  planification: Planification;
  listType: 'tous' | 'favoris';
  hide: boolean;
}

interface StateProps {
  favoriteNotifications: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface NotificationListProps extends OwnProps, StateProps, DispatchProps { };

const NotificationList: React.FC<NotificationListProps> = ({ addFavorite, removeFavorite, favoriteNotifications, hide, planification, listType }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (planification.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          Aucune notification trouvée
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {planification.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                {group.jour}
              </IonLabel>
            </IonItemDivider>
            {group.notifications.map((notification: Notification, notificationIndex: number) => (
              <NotificationListItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteNotifications.indexOf(notification.id) > -1}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                key={`group-${index}-${notificationIndex}`}
                notification={notification}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteNotifications: state.data.favoris
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: NotificationList
});
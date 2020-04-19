import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { starOutline, star, share, cloudDownload } from 'ionicons/icons';
import './NotificationDetail.scss';
import { addFavorite, removeFavorite } from '../data/notifications/notifications.actions';
import { Notification } from '../models/Planification';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  notification?: Notification;
  favoriteNotifications: number[],
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type NotificationDetailProps = OwnProps & StateProps & DispatchProps;

const NotificationDetail: React.FC<NotificationDetailProps> = ({ notification, addFavorite, removeFavorite, favoriteNotifications }) => {

  if (!notification) {
    return <div>Notification not found</div>
  }

  const isFavorite = favoriteNotifications.indexOf(notification.id) > -1;
  
  const toggleFavorite = () => { 
    isFavorite ? removeFavorite(notification.id) : addFavorite(notification.id);
  };
  const shareNotification = () => { };
  const notificationClick = (text: string) => { 
    console.log(`Clicked ${text}`);
  };

  return (
    <IonPage id="notification-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/planification"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
            <IonButton onClick={() => shareNotification}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{notification.name}</h1>
          {notification.tags.map(tag => (
            <span key={tag} className={`notification-tag-${tag.toLowerCase()}`}>{tag}</span>
          ))}
          <p>{notification.description}</p>
          <IonText color="medium">
            {notification.timeStart} &ndash; {notification.timeEnd}
            <br />
            {notification.location}
          </IonText>
        </div>
        <IonList>
          <IonItem onClick={() => notificationClick('watch')} button>
            <IonLabel color="primary">Watch</IonLabel>
          </IonItem>
          <IonItem onClick={() => notificationClick('add to calendar')} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
          <IonItem onClick={() => notificationClick('mark as unwatched')} button>
            <IonLabel color="primary">Mark as Unwatched</IonLabel>
          </IonItem>
          <IonItem onClick={() => notificationClick('download video')} button>
            <IonLabel color="primary">Download Video</IonLabel>
            <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
          </IonItem>
          <IonItem onClick={() => notificationClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    notification: selectors.getNotification(state, OwnProps),
    favoriteNotifications: state.data.favoris
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(NotificationDetail)
})
import React from 'react';
import { Notification } from '../models/Planification';
import { Asset } from '../models/Asset';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';


interface AssetItemProps {
  asset: Asset;
  notifications: Notification[];
}

const AssetItem: React.FC<AssetItemProps> = ({ asset, notifications }) => {
  return (
    <>
      <IonCard className="asset-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="asset-item" routerLink={`/tabs/assets/${asset.id}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + asset.profilePic} alt="Asset profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{asset.name}</h2>
              <p>{asset.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {notifications.map(notification => (
              <IonItem detail={false} routerLink={`/tabs/assets/notifications/${notification.id}`} key={notification.name}>
                <IonLabel>
                  <h3>{notification.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/assets/${asset.id}`}>
              <IonLabel>
                <h3>A propos {asset.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default AssetItem;
import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import AssetItem from '../components/AssetItem';
import { Asset } from '../models/Asset';
import { Notification } from '../models/Planification';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './AssetList.scss';

interface OwnProps { };

interface StateProps {
  assets: Asset[];
  assetNotifications: { [key: string]: Notification[] };
};

interface DispatchProps { };

interface AssetListProps extends OwnProps, StateProps, DispatchProps { };

const AssetList: React.FC<AssetListProps> = ({ assets, assetNotifications }) => {

  return (
    <IonPage id="asset-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Assets</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Assets</IonTitle>
          </IonToolbar>
        </IonHeader>

          <IonGrid fixed>
            <IonRow>
              {assets.map(asset => (
                <IonCol size="12" size-md="6" key={asset.id}>
                  <AssetItem
                    key={asset.id}
                    asset={asset}
                    notifications={assetNotifications[asset.name]}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    assets: selectors.getAssets(state),
    assetNotifications: selectors.getAssetNotifications(state)
  }),
  component: React.memo(AssetList)
});
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './AssetDetail.scss';

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoTwitter, logoGithub, logoInstagram, shareOutline, shareSharp } from 'ionicons/icons';

import { connect } from '../data/connect';
import * as selectors from '../data/selectors';

import { Asset } from '../models/Asset';


interface OwnProps extends RouteComponentProps {
  asset?: Asset;
};

interface StateProps {};

interface DispatchProps {};

interface AssetDetailProps extends OwnProps, StateProps, DispatchProps {};

const AssetDetail: React.FC<AssetDetailProps> = ({ asset }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openAssetShare(asset: Asset) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked');
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked');
        }
      },
      {
        text: 'Annuler',
        role: 'annuler',
        handler: () => {
          console.log('Annuler clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${asset.name}`);
    setShowActionSheet(true);
  }

  function openContact(asset: Asset) {
    setActionSheetButtons([
      {
        text: `Email ( ${asset.email} )`,
        handler: () => {
          window.open('mailto:' + asset.email);
        }
      },
      {
        text: `Call ( ${asset.phone} )`,
        handler: () => {
          window.open('tel:' + asset.phone);
        }
      }
    ]);
    setActionSheetHeader(`Share ${asset.name}`);
    setShowActionSheet(true);
  }

  function openExternalUrl(url: string) {
    window.open(url, '_blank');
  }

  if (!asset) {
    return <div>Asset not found</div>
  }

  return (
    <IonPage id="asset-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/assets" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => openContact(asset)}>
                <IonIcon slot="icon-only" ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
              <IonButton onClick={() => openAssetShare(asset)}>
                <IonIcon slot="icon-only" ios={shareOutline} md={shareSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="asset-background">
          <img src={asset.profilePic} alt={asset.name}/>
          <h2>{asset.name}</h2>
        </div>

        <div className="ion-padding asset-detail">
          <p>{asset.apropos} Say hello on social media!</p>

          <hr/>

          <IonChip color="twitter" onClick={() => openExternalUrl(`https://twitter.com/${asset.twitter}`)}>
            <IonIcon icon={logoTwitter}></IonIcon>
            <IonLabel>Twitter</IonLabel>
          </IonChip>

          <IonChip color="dark" onClick={() => openExternalUrl('https://github.com/ionic-team/ionic')}>
            <IonIcon icon={logoGithub}></IonIcon>
            <IonLabel>GitHub</IonLabel>
          </IonChip>

          <IonChip color="instagram" onClick={() => openExternalUrl('https://instagram.com/ionicframework')}>
            <IonIcon icon={logoInstagram}></IonIcon>
            <IonLabel>Instagram</IonLabel>
          </IonChip>
        </div>
      </IonContent>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    asset: selectors.getAsset(state, ownProps)
  }),
  component: AssetDetail
});

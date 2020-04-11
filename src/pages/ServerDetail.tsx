import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './ServerDetail.scss';

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoTwitter, logoGithub, logoInstagram, shareOutline, shareSharp } from 'ionicons/icons';

import { connect } from '../data/connect';
import * as selectors from '../data/selectors';

import { Server } from '../models/Server';


interface OwnProps extends RouteComponentProps {
  server?: Server;
};

interface StateProps {};

interface DispatchProps {};

interface ServerDetailProps extends OwnProps, StateProps, DispatchProps {};

const ServerDetail: React.FC<ServerDetailProps> = ({ server }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openServerShare(server: Server) {
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
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${server.name}`);
    setShowActionSheet(true);
  }

  function openContact(server: Server) {
    setActionSheetButtons([
      {
        text: `Email ( ${server.email} )`,
        handler: () => {
          window.open('mailto:' + server.email);
        }
      },
      {
        text: `Call ( ${server.phone} )`,
        handler: () => {
          window.open('tel:' + server.phone);
        }
      }
    ]);
    setActionSheetHeader(`Share ${server.name}`);
    setShowActionSheet(true);
  }

  function openExternalUrl(url: string) {
    window.open(url, '_blank');
  }

  if (!server) {
    return <div>Server not found</div>
  }

  return (
    <IonPage id="server-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/servers" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => openContact(server)}>
                <IonIcon slot="icon-only" ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
              <IonButton onClick={() => openServerShare(server)}>
                <IonIcon slot="icon-only" ios={shareOutline} md={shareSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="server-background">
          <img src={server.profilePic} alt={server.name}/>
          <h2>{server.name}</h2>
        </div>

        <div className="ion-padding server-detail">
          <p>{server.about} Say hello on social media!</p>

          <hr/>

          <IonChip color="twitter" onClick={() => openExternalUrl(`https://twitter.com/${server.twitter}`)}>
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
    server: selectors.getServer(state, ownProps)
  }),
  component: ServerDetail
});

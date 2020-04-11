import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import ServerItem from '../components/ServerItem';
import { Server } from '../models/Server';
import { Video } from '../models/Assets';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './ServerList.scss';

interface OwnProps { };

interface StateProps {
  servers: Server[];
  serverVideos: { [key: string]: Video[] };
};

interface DispatchProps { };

interface ServerListProps extends OwnProps, StateProps, DispatchProps { };

const ServerList: React.FC<ServerListProps> = ({ servers, serverVideos }) => {

  return (
    <IonPage id="server-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Servers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Servers</IonTitle>
          </IonToolbar>
        </IonHeader>

          <IonGrid fixed>
            <IonRow>
              {servers.map(server => (
                <IonCol size="12" size-md="6" key={server.id}>
                  <ServerItem
                    key={server.id}
                    server={server}
                    videos={serverVideos[server.name]}
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
    servers: selectors.getServers(state),
    serverVideos: selectors.getServerVideos(state)
  }),
  component: React.memo(ServerList)
});
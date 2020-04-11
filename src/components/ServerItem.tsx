import React from 'react';
import { Video } from '../models/Assets';
import { Server } from '../models/Server';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';


interface ServerItemProps {
  server: Server;
  videos: Video[];
}

const ServerItem: React.FC<ServerItemProps> = ({ server, videos }) => {
  return (
    <>
      <IonCard className="server-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="server-item" routerLink={`/tabs/servers/${server.id}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + server.profilePic} alt="Server profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{server.name}</h2>
              <p>{server.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {videos.map(video => (
              <IonItem detail={false} routerLink={`/tabs/servers/videos/${video.id}`} key={video.name}>
                <IonLabel>
                  <h3>{video.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/servers/${server.id}`}>
              <IonLabel>
                <h3>About {server.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default ServerItem;
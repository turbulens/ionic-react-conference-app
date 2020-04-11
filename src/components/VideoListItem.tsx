import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Video } from '../models/Assets';

interface VideoListItemProps {
  video: Video;
  listType: "all" | "favoris";
  onAddFavori: (id: number) => void;
  onRemoveFavori: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavori: boolean;
}

const VideoListItem: React.FC<VideoListItemProps> = ({ isFavori, onAddFavori, onRemoveFavori, onShowAlert, video, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriVideo = () => {
    onAddFavori(video.id);
    onShowAlert('Favori already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavori(video.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriVideo = () => {
    if (isFavori) {
      // woops, they already favorid it! What shall we do!?
      // prompt them to remove it
      removeFavoriVideo();
    } else {
      // remember this video as a user favori
      onAddFavori(video.id);
      onShowAlert('Favori Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + video.tracks[0].toLowerCase()}>
      <IonItem routerLink={`/tabs/assets/${video.id}`}>
        <IonLabel>
          <h3>{video.name}</h3>
          <p>
            {video.timeStart}&mdash;&nbsp;
            {video.timeStart}&mdash;&nbsp;
            {video.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === "favoris" ?
          <IonItemOption color="danger" onClick={() => removeFavoriVideo()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favori" onClick={addFavoriVideo}>
            Favori
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(VideoListItem);
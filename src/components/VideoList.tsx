import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Assets, Video } from '../models/Assets';
import VideoListItem from './VideoListItem';
import { connect } from '../data/connect';
import { addFavori, removeFavori } from '../data/videos/videos.actions';

interface OwnProps {
  assets: Assets;
  listType: 'all' | 'favoris';
  hide: boolean;
}

interface StateProps {
  favoriVideos: number[];
}

interface DispatchProps {
  addFavori: typeof addFavori;
  removeFavori: typeof removeFavori;
}

interface VideoListProps extends OwnProps, StateProps, DispatchProps { };

const VideoList: React.FC<VideoListProps> = ({ addFavori, removeFavori, favoriVideos, hide, assets, listType }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (assets.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Videos Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {assets.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                {group.time}
              </IonLabel>
            </IonItemDivider>
            {group.videos.map((video: Video, videoIndex: number) => (
              <VideoListItem
                onShowAlert={handleShowAlert}
                isFavori={favoriVideos.indexOf(video.id) > -1}
                onAddFavori={addFavori}
                onRemoveFavori={removeFavori}
                key={`group-${index}-${videoIndex}`}
                video={video}
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
    favoriVideos: state.data.favoris
  }),
  mapDispatchToProps: ({
    addFavori,
    removeFavori
  }),
  component: VideoList
});
import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { starOutline, star, share, cloudDownload } from 'ionicons/icons';
import './VideoDetail.scss';
import { addFavori, removeFavori } from '../data/videos/videos.actions';
import { Video } from '../models/Assets';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  video?: Video;
  favoriVideos: number[],
};

interface DispatchProps {
  addFavori: typeof addFavori;
  removeFavori: typeof removeFavori;
}

type VideoDetailProps = OwnProps & StateProps & DispatchProps;

const VideoDetail: React.FC<VideoDetailProps> = ({ video, addFavori, removeFavori, favoriVideos }) => {

  if (!video) {
    return <div>Video not found</div>
  }

  const isFavori = favoriVideos.indexOf(video.id) > -1;
  
  const toggleFavori = () => { 
    isFavori ? removeFavori(video.id) : addFavori(video.id);
  };
  const shareVideo = () => { };
  const videoClick = (text: string) => { 
    console.log(`Clicked ${text}`);
  };

  return (
    <IonPage id="video-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/assets"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleFavori()}>
              {isFavori ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
            <IonButton onClick={() => shareVideo}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{video.name}</h1>
          {video.tracks.map(track => (
            <span key={track} className={`video-track-${track.toLowerCase()}`}>{track}</span>
          ))}
          <p>{video.description}</p>
          <IonText color="medium">
            {video.timeStart} &ndash; {video.timeEnd}
            <br />
            {video.location}
          </IonText>
        </div>
        <IonList>
          <IonItem onClick={() => videoClick('watch')} button>
            <IonLabel color="primary">Watch</IonLabel>
          </IonItem>
          <IonItem onClick={() => videoClick('add to calendar')} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
          <IonItem onClick={() => videoClick('mark as unwatched')} button>
            <IonLabel color="primary">Mark as Unwatched</IonLabel>
          </IonItem>
          <IonItem onClick={() => videoClick('download video')} button>
            <IonLabel color="primary">Download Video</IonLabel>
            <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
          </IonItem>
          <IonItem onClick={() => videoClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    video: selectors.getVideo(state, OwnProps),
    favoriVideos: state.data.favoris
  }),
  mapDispatchToProps: {
    addFavori,
    removeFavori
  },
  component: withRouter(VideoDetail)
})
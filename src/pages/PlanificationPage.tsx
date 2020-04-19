import React, { useState, useRef } from 'react';

import { IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react';
import { options, search } from 'ionicons/icons';

import NotificationList from '../components/NotificationList';
import NotificationListFilter from '../components/NotificationListFilter';
import './PlanificationPage.scss'

import ShareSocialFab from '../components/ShareSocialFab';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { setSearchText } from '../data/notifications/notifications.actions';
import { Planification } from '../models/Planification';

interface OwnProps { }

interface StateProps {
  planification: Planification;
  favorisPlanification: Planification;
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type PlanificationPageProps = OwnProps & StateProps & DispatchProps;

const PlanificationPage: React.FC<PlanificationPageProps> = ({ favorisPlanification, planification, setSearchText, mode }) => {
  const [segment, setSegment] = useState<'tous' | 'favoris'>('tous');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  return (
    <IonPage ref={pageRef} id="planification-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {ios &&
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="tous">
                Tous
              </IonSegmentButton>
              <IonSegmentButton value="favoris">
                Favoris
              </IonSegmentButton>
            </IonSegment>
          }
          {!ios && !showSearchbar &&
            <IonTitle>Planification</IonTitle>
          }
          {showSearchbar &&
            <IonSearchbar showCancelButton="always" placeholder="Recherche" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
          }

          <IonButtons slot="end">
            {!ios && !showSearchbar &&
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            }
            {!showSearchbar &&
              <IonButton onClick={() => setShowFilterModal(true)}>
                {mode === 'ios' ? 'Filter' : <IonIcon icon={options} slot="icon-only" />}
              </IonButton>
            }
          </IonButtons>
        </IonToolbar>

        {!ios &&
          <IonToolbar>
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="tous">
                Tous
              </IonSegmentButton>
              <IonSegmentButton value="favoris">
                Favoris
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        }
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Planification</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Recherche" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />

        <NotificationList
          planification={planification}
          listType={segment}
          hide={segment === 'favoris'}
        />
        <NotificationList
          // planification={planification}
          planification={favorisPlanification}
          listType={segment}
          hide={segment === 'tous'}
        />
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
        cssClass="notification-list-filter"
      >
        <NotificationListFilter
          onDismissModal={() => setShowFilterModal(false)}
        />
      </IonModal>

      <ShareSocialFab />

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    planification: selectors.getSearchedPlanification(state),
    favorisPlanification: selectors.getGroupedFavoris(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(PlanificationPage)
});
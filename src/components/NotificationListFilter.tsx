import React from 'react';

import { getMode } from '@ionic/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonCheckbox, IonFooter, IonIcon } from '@ionic/react';
import { logoAngular, call, document, logoIonic, hammer, restaurant, cog, colorPalette, construct, compass } from 'ionicons/icons';

import './NotificationListFilter.css'

import { connect } from '../data/connect';
import { updateFilteredTags } from '../data/notifications/notifications.actions';

interface OwnProps {
  onDismissModal: () => void;
}

interface StateProps {
  allTags: string[],
  filteredTags: string[]
}

interface DispatchProps {
  updateFilteredTags: typeof updateFilteredTags;
}

type NotificationListFilterProps = OwnProps & StateProps & DispatchProps;

const NotificationListFilter: React.FC<NotificationListFilterProps> = ({ allTags, filteredTags, onDismissModal, updateFilteredTags }) => {
  const ios = getMode() === 'ios';

  const toggleTagFilter = (tag: string) => {
    if (filteredTags.indexOf(tag) > -1) {
      updateFilteredTags(filteredTags.filter(x => x !== tag));
    } else {
      updateFilteredTags([...filteredTags, tag]);
    }
  };

  const handleDeselectTous = () => {
    updateFilteredTags([]);
  };

  const handleSelectTous = () => {
    updateFilteredTags([...allTags]);
  };

  const iconCarte: { [key: string]: any } = {
    'Angular': logoAngular,
    'Documentation': document,
    'Food': restaurant,
    'Ionic': logoIonic,
    'Tooling': hammer,
    'Design': colorPalette,
    'Services': cog,
    'Workshop': construct,
    'Navigation': compass,
    'Communication': call
  }

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            { ios &&
              <IonButton onClick={onDismissModal}>Annuler</IonButton>
            }
            { !ios &&
              <IonButton onClick={handleDeselectTous}>Déselectionner</IonButton>
            }
          </IonButtons>

          <IonTitle>
            Filtrer Notifications
          </IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>OK</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines={ ios ? 'inset' : 'full'}>
          <IonListHeader>Tags</IonListHeader>

          {allTags.map((tag, index) => (
            <IonItem key={tag}>
              { ios &&
                <IonIcon slot="start" icon={iconCarte[tag]} color="medium" />
              }
              <IonLabel>{tag}</IonLabel>
              <IonCheckbox
                onClick={() => toggleTagFilter(tag)}
                checked={filteredTags.indexOf(tag) !== -1}
                color="primary"
                value={tag}
              ></IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      { ios &&
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleDeselectTous}>Tout déselectionner</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleSelectTous}>Tout sélectionner</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      }
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    allTags: state.data.allTags,
    filteredTags: state.data.filteredTags
  }),
  mapDispatchToProps: {
    updateFilteredTags
  },
  component: NotificationListFilter
})

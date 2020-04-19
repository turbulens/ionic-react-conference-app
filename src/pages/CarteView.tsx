import React from 'react';
import Carte from '../components/Carte';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react';
import { Location } from '../models/Location';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './CarteView.scss';

interface OwnProps { }

interface StateProps {
  locations: Location[];
  mapCenter: Location;
}

interface DispatchProps { }

interface CarteViewProps extends OwnProps, StateProps, DispatchProps { };

const CarteView: React.FC<CarteViewProps> = ({ locations, mapCenter }) => {
  return (
  <IonPage id="map-view">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Carte</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="map-page">
      <Carte locations={locations} mapCenter={mapCenter} />
    </IonContent>
  </IonPage>
)};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),
  component: CarteView
});

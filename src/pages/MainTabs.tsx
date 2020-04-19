import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people } from 'ionicons/icons';
import PlanificationPage from './PlanificationPage';
import AssetList from './AssetList';
import AssetDetail from './AssetDetail';
import NotificationDetail from './NotificationDetail';
import CarteView from './CarteView';
import APropos from './APropos';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/planification" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/planification" render={() => <PlanificationPage />} exact={true} />
        <Route path="/tabs/assets" render={() => <AssetList />} exact={true} />
        <Route path="/tabs/assets/:id" component={AssetDetail} exact={true} />
        <Route path="/tabs/planification/:id" component={NotificationDetail} />
        <Route path="/tabs/assets/notifications/:id" component={NotificationDetail} />
        <Route path="/tabs/map" render={() => <CarteView />} exact={true} />
        <Route path="/tabs/apropos" render={() => <APropos />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="planification" href="/tabs/planification">
          <IonIcon icon={calendar} />
          <IonLabel>Planification</IonLabel>
        </IonTabButton>
        <IonTabButton tab="assets" href="/tabs/assets">
          <IonIcon icon={people} />
          <IonLabel>Assets</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={location} />
          <IonLabel>Carte</IonLabel>
        </IonTabButton>
        <IonTabButton tab="apropos" href="/tabs/apropos">
          <IonIcon icon={informationCircle} />
          <IonLabel>A propos</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
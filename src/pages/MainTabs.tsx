import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, people } from 'ionicons/icons';
import AssetsPage from './AssetsPage';
import ServerList from './ServerList';
import ServerDetail from './ServerDetail';
import VideoDetail from './VideoDetail';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/assets" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/assets" render={() => <AssetsPage />} exact={true} />
        <Route path="/tabs/servers" render={() => <ServerList />} exact={true} />
        <Route path="/tabs/servers/:id" component={ServerDetail} exact={true} />
        <Route path="/tabs/assets/:id" component={VideoDetail} />
        <Route path="/tabs/servers/videos/:id" component={VideoDetail} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="assets" href="/tabs/assets">
          <IonIcon icon={calendar} />
          <IonLabel>Assets</IonLabel>
        </IonTabButton>
        <IonTabButton tab="servers" href="/tabs/servers">
          <IonIcon icon={people} />
          <IonLabel>Servers</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
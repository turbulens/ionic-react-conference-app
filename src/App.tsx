import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import { loadApplData } from './data/notifications/notifications.actions';
import { setIsLoggedIn, setUtilisateur, loadUserData } from './data/user/user.actions';
import Compte from './pages/Compte';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Support from './pages/Support';
import Information from './pages/Information';
import AccueilOuInformation from './components/AccueilOuInformation';
import { Planification } from "./models/Planification";

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  planification: Planification;
}

interface DispatchProps {
  loadApplData: typeof loadApplData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUtilisateur: typeof setUtilisateur;
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ darkMode, planification, setIsLoggedIn, setUtilisateur, loadApplData, loadUserData }) => {

  useEffect(() => {
    loadUserData();
    loadApplData();
    // eslint-disable-next-line
  }, []);

  return (
    planification.groups.length === 0 ? (
      <div></div>
    ) : (
        <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/tabs" component={MainTabs} />
                <Route path="/compte" component={Compte} />
                <Route path="/connexion" component={Connexion} />
                <Route path="/inscription" component={Inscription} />
                <Route path="/support" component={Support} />
                <Route path="/information" component={Information} />
                <Route path="/deconnexion" render={() => {
                  setIsLoggedIn(false);
                  setUtilisateur(undefined);
                  return <Redirect to="/tabs" />
                }} />
                <Route path="/" component={AccueilOuInformation} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    planification: state.data.planification
  }),
  mapDispatchToProps: { loadApplData, loadUserData, setIsLoggedIn, setUtilisateur },
  component: IonicApp
});

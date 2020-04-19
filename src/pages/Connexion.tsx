import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Connexion.scss';
import { setIsLoggedIn, setUtilisateur } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUtilisateur: typeof setUtilisateur;
}

interface ConnexionProps extends OwnProps,  DispatchProps { }

const Connexion: React.FC<ConnexionProps> = ({setIsLoggedIn, history, setUtilisateur: setUtilisateurAction}) => {

  const [utilisateur, setUtilisateur] = useState('');
  const [motdepasse, setMotDePasse] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [utilisateurError, setUtilisateurError] = useState(false);
  const [motdepasseError, setMotDePasseError] = useState(false);

  const connexion = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!utilisateur) {
      setUtilisateurError(true);
    }
    if(!motdepasse) {
      setMotDePasseError(true);
    }

    if(utilisateur && motdepasse) {
      await setIsLoggedIn(true);
      await setUtilisateurAction(utilisateur);
      history.push('/tabs/planification', {direction: 'none'});
    }
  };

  return (
    <IonPage id="connexion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="connexion-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={connexion}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Utilisateur</IonLabel>
              <IonInput name="utilisateur" type="text" value={utilisateur} spellCheck={false} autocapitalize="off" onIonChange={e => setUtilisateur(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && utilisateurError && <IonText color="danger">
              <p className="ion-padding-start">
                Utilisateur requis
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Mot de passe</IonLabel>
              <IonInput name="motdepasse" type="password" value={motdepasse} onIonChange={e => setMotDePasse(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && motdepasseError && <IonText color="danger">
              <p className="ion-padding-start">
              Mot de passe requis
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Connexion</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/inscription" color="light" expand="block">Inscription</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUtilisateur
  },
  component: Connexion
})
import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react';
import './Compte.scss';
import { setUtilisateur } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  utilisateur?: string;
}

interface DispatchProps {
  setUtilisateur: typeof setUtilisateur;
}

interface CompteProps extends OwnProps, StateProps, DispatchProps { }

const Compte: React.FC<CompteProps> = ({ setUtilisateur, utilisateur }) => {

  const [showAlert, setShowAlert] = useState(false);

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  }

  return (
    <IonPage id="compte-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {utilisateur &&
          (<div className="ion-padding-top ion-text-center">
            <img src="https://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />
            <h2>{ utilisateur }</h2>
            <IonList inset>
              <IonItem onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
              <IonItem onClick={() => setShowAlert(true)}>Change Utilisateur</IonItem>
              <IonItem onClick={() => clicked('Change MotDePasse')}>Change MotDePasse</IonItem>
              <IonItem routerLink="/support" routerDirection="none">Support</IonItem>
              <IonItem routerLink="/deconnexion" routerDirection="none">Deconnexion</IonItem>
            </IonList>
          </div>)
        }
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Change Utilisateur"
        buttons={[
          'Annuler',
          {
            text: 'Ok',
            handler: (data) => {
              setUtilisateur(data.utilisateur);
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'utilisateur',
            value: utilisateur,
            placeholder: 'utilisateur'
          }
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    utilisateur: state.user.utilisateur
  }),
  mapDispatchToProps: {
    setUtilisateur,
  },
  component: Compte
})
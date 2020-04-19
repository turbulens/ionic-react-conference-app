import { getUserData, setIsLoggedInData, setUtilisateurData, setHasSeenInformationData, setDarkmodeData } from '../dataApi';
import { ActionType } from '../../util/types';
import { UserState } from './user.state';


export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getUserData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-user-loading',
  isLoading
} as const);

export const setData = (data: Partial<UserState>) => ({
  type: 'set-user-data',
  data
} as const);

export const deconnexionUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false);
  dispatch(setUtilisateur());
};

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn);
  return ({
    type: 'set-is-loggedin',
    loggedIn
  } as const)
};

export const setUtilisateur = (utilisateur?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUtilisateurData(utilisateur);
  return ({
    type: 'set-utilisateur',
    utilisateur
  } as const);
};

export const setHasSeenInformation = (hasSeenInformation: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenInformationData(hasSeenInformation);
  return ({
    type: 'set-has-seen-information',
    hasSeenInformation
  } as const);
} 

export const setDarkMode = (darkMode: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setDarkmodeData(darkMode);
  return ({
    type: 'set-dark-mode',
    darkMode
  } as const);
} 

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUtilisateur>
  | ActionType<typeof setHasSeenInformation>
  | ActionType<typeof setDarkMode>

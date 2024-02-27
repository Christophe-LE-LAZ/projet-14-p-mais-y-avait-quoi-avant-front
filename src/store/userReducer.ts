import {createReducer, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { ICredentials } from '../types/credentials'
import axios from 'axios';
import { RootState } from '.';
import { TInputNameCred, TInputNameRegister } from '../types/inputName';

interface UserState {
  id: number | null
  firstname: string;
  lastname: string;
  email: string;
  password : string
  credentials : ICredentials;
  password_check : string
  logged: boolean;
  loading: boolean;
  error: string;
  message : string;
  registered: boolean;
  deleted : boolean;
}

export const initialState: UserState = {
  id: null,
  firstname:'',
  email: '',
  lastname: '',
  password : '',
  credentials: {
    username: '',
    password: '',
  },
  password_check: '',
  logged: false,
  loading: false,
  error: "",
  message: "",
  registered: false,
  deleted: false

}

// Register : création d'une action : vérification du mot de passe
export const passwordCheck = createAction<string>('user/passwordCheck');

// Register : creation d'une action : inputs -> valeurs du state
export const changeFieldStateRegister = createAction<{
  inputValue : string;
  inputName: TInputNameRegister;
}>('user/changeFieldStateRegister');

// Register : création d'une AsyncThunk : création d'un utilisateur
export const register = createAsyncThunk('user/register', async (_, thunkAPI) => {
  // Récupération de la valeur du state via la thunkAPI
  const state = thunkAPI.getState() as RootState;
  // Récupération des valeurs contenues dans le state
  const firstname = state.user.firstname;
  const lastname = state.user.lastname;
  const email = state.user.email;
  const password = state.user.password;
  const userData = {firstname, lastname, email, password}
  // Envoi des données
  const { data } = await axios.post('https://admin.auparavant.fr/api/register', userData);
  return data;
});

// Login : création d'une action : inputs -> valeurs du state
export const changeFieldStateCred = createAction<{
  inputValue : string;
  inputName: TInputNameCred;
}>('user/changeFieldStateCred');

// Login : création d'une AsyncThunk : identification de l'utilisateur
export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
  // Récupération de la valeur du state via la thunkAPI
  const state = thunkAPI.getState() as RootState;
  // Récupération des valeurs contenues dans credentials
  const credentials = state.user.credentials as ICredentials;
  // Envoi des credentials
  const { data } = await axios.post('https://admin.auparavant.fr/api/login_check', credentials);
  // Configuration de l'instance d'axios avec le token reçu
  axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };
  return data.data;
});
  
// Logout : création d'une action : déconnexion de l'utilisateur
export const logout = createAction('user/logout');

// Delete : creation d'une AsyncThunk : suppression de l'utilisateur
export const deleteUser = createAsyncThunk('user/deleteUser', async (_, thunkAPI) => {
  // Récupération de la valeur du state via la thunkAPI
  const state = thunkAPI.getState() as RootState;
  // Récupération de l'ID de l'utilisateur connecté
  const userID = state.user.id;
  const { data } = await axios.delete(`https://admin.auparavant.fr/api/secure/delete/user/${userID}`);
  return data;
});

//Update : modifier le profil de l'utilisateur

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (_, thunkAPI) => {
    // Récupération de la valeur du state via la thunkAPI
    const state = thunkAPI.getState() as RootState;
    // Récupération des valeurs contenues dans le state
    const { id, firstname, lastname, email, password } = state.user;
    const userData = { id, firstname, lastname, email, password };
    // Envoi des données
    const { data } = await axios.put(`https://admin.auparavant.fr/api/secure/update/user/${id}`, userData);
    return data;
  }
);



// Création du reducer 

const userReducer = createReducer(initialState, (builder) => {

  // Register : vérification que les deux passwords entrés sont identiques
    builder.addCase(passwordCheck, (state, action) => {
      const inputValue = action.payload;
      if (inputValue !== state.password) {
        state.error = "Les mots de passe doivent être identiques";
       } else {
        state.error = ""
      }
    })

    // Register : changement de la valeur du state
    .addCase(changeFieldStateRegister, (state, action) => {
      state.error="";
      const { inputName, inputValue } = action.payload;
      state[inputName] = inputValue;
    })

    // Register : gestion du cas "pending" 
    .addCase(register.pending, (state) => {
      state.error = "";
      state.loading = true;
    })
    // Register : gestion du cas "rejected" 
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    })
    // Register : gestion du cas "fullfilled" 
    .addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.firstname = '',
      state.email =  '',
      state.lastname = '',
      state.password = '',
      state.registered = true;
      state.message = "Votre inscription a bien été prise en compte. Merci de vous connecter."
    })

    // Login : changement des valeurs du state.credentials
    .addCase(changeFieldStateCred, (state, action) => {
      state.error="";
      const { inputName, inputValue } = action.payload;
      state.credentials[inputName] = inputValue;
    })

    // Login : gestion du cas "pending" 
    .addCase(login.pending, (state) => {
      state.error = "";
      state.loading = true;
    })
    // Login : gestion du cas "rejected"
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      })
    // Login : gestion du cas "fullfilled" 
    .addCase(login.fulfilled, (state, action) => {
      const { id, username, lastname, email } = action.payload;
      state.loading = false;
      state.error = "";
      state.id = id;
      state.firstname = username;
      state.lastname = lastname;
      state.email = email;
      state.credentials.username = '';
      state.credentials.password = '';
      state.registered = false;
      state.logged = true;
    })
    
    // Logout : gestion de la déconnexion
    .addCase(logout, (state) => {
      state.id = null
      state.firstname = '';
      state.lastname = '';
      state.email = '';
      state.logged = false;
      // Suppression du token des headers de l'instance axios
      axios.defaults.headers.common = {};
    })

    // Delete : gestion du cas "pending"
    .addCase(deleteUser.pending, (state) => {
      state.error = "";
      state.loading = true;
    })
    // Delete : gestion du cas "rejected"
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    })
    // Delete : gestion du cas "fullfilled" 
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.firstname = '';
      state.lastname = '';
      state.email = '';
      state.logged = false;
      state.deleted = true;
      state.message = "Votre compte a bien été supprimé."
  })

    // nouvelle donnée de l'utilisateur 
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      const { id, firstname, lastname, email } = action.payload;
      state.id = id;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
    })


  });

  export default userReducer;

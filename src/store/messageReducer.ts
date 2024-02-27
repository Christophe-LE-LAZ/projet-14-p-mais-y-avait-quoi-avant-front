import {
    createAction,
    createReducer,
  } from '@reduxjs/toolkit';

  interface MessageState {
    action_done : boolean
    message : string
  }

  // Déclaration de l'état initial 
  export const initialState: MessageState = {
    action_done : false,
    message : ""
  };

    // Création d'une action pour la mise à jour du state avec la current location
    export const setMessage = createAction<string>('message/setMessage');

    // Création d'une action pour la mise à jour du state avec la current location
    export const clearMessage = createAction('message/clearMessage');

  const messageReducer = createReducer(initialState, (builder) => {
        builder
          .addCase(setMessage, (state, action) => {
            state.action_done = true;
            state.message = action.payload;
          })
          .addCase(clearMessage, (state, action) => {
            state.action_done = false;
            state.message = "";
          })
      });
  
  export default messageReducer;
  
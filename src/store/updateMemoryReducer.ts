import {
    createAction,
    createAsyncThunk,
    createReducer,
  } from '@reduxjs/toolkit';

import axios from 'axios';
import { IMemoryToCreate, IPlaceToCreate } from '../types/memory';
import { RootState } from '.';
import { TInputNameMemory, TInputNamePlace } from '../types/inputName';

  interface UpdateMemoryState {
    memory : IMemoryToCreate;
    place : IPlaceToCreate;
    loading: boolean;
    error: null | string;
  }

  // Déclaration de l'état initial 
  export const initialState: UpdateMemoryState = {
    memory : {
        title: "",
        content: "",
        picture_date: ""
    },
    place: {
        name: "",
        type: ""
    },
    loading: false,
    error: null
  };
  
  // Création d'une action pour la modification des valeurs du State -> Memory
  export const changeFieldStateMemory = createAction<{
    inputValueM : string;
    inputNameM: TInputNameMemory;
    }>('updateMemory/changeFieldStateMemory');

  // Création d'une action pour la modification des valeurs du State -> Place
  export const changeFieldStatePlace = createAction<{
    inputValueP : string;
    inputNameP : TInputNamePlace;
  }>('updateMemory/changeFieldStatePlace');

    // Modification d'un souvenir en BDD : memory + place
    export const updateMemory = createAsyncThunk(
      'updateMemory/updateMemory',
     async (IDs: (number | null)[], thunkAPI) => {
        // Récupération du state via la thunkAPI
        const state = thunkAPI.getState() as RootState;
        // Création du body de la requête
        const title = state.updateMemory.memory.title;
        const content = state.updateMemory.memory.content;
        const picture_date = state.updateMemory.memory.picture_date;
        const name = state.updateMemory.place.name;
        const type = state.updateMemory.place.type;
        const memory = {id : IDs[0], title, content, picture_date};
        const place = {update_place: true, id : IDs[1], name, type};
        const memoryToUpdate = {memory, place};
        console.log(memoryToUpdate);
        // Envoi de la requête en PUT 
        const { data } = await axios.put(`https://admin.auparavant.fr/api/secure/update/memory-and-place/${IDs[0]}`, memoryToUpdate);
        console.log(data)
        return data;
      }
    )

  // Création d'une action pour la mise à jour des states après la modification d'un souvenir 
  export const updatedMemory = createAction('updateMemory/updatedMemory');

  const updateMemoryReducer = createReducer(initialState, (builder) => {
    builder
      // Modification du state suite à une nouvelle inputValue dans le fieldset memory
      .addCase(changeFieldStateMemory, (state, action) => {
        const { inputNameM, inputValueM } = action.payload;
        state.memory[inputNameM] = inputValueM;
      })
      // Modification du state suite à une nouvelle inputValue dans le fieldset place
      .addCase(changeFieldStatePlace, (state, action) => {
        const { inputNameP, inputValueP } = action.payload;
        state.place[inputNameP] = inputValueP;
        console.log(state.place.name)
        console.log(state.place.type)
      })
        // Gestion du cas "pending" de la création d'un souvenir + place + location
      .addCase(updateMemory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la création d'un souvenir + place + location
      .addCase(updateMemory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la création d'un souvenir + place + location
      .addCase(updateMemory.fulfilled, () => {
        console.log('Souvenir modifié')
      })
        // Modification du state suite à la création effective d'un souvenir en BDD
      .addCase(updatedMemory, (state) => {
        state.loading = false;
        state.error = null;
      })
      });
  
  export default updateMemoryReducer;
  
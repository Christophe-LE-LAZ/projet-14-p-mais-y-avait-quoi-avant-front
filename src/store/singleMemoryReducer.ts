import {
    createAsyncThunk,
    createReducer,
  } from '@reduxjs/toolkit';

import axios from 'axios';
import { IDataCreated } from '../types/memory';
import { RootState } from '.';

  interface SingleMemoryState {
    memory : IDataCreated
    loading: boolean;
    error: null | string;
  }

  // Déclaration de l'état initial 
  export const initialState: SingleMemoryState = {
    memory :   {
        id : null,
        title: "",
        content: "",
        picture_date: "",
        main_picture: "",
        location: {
          id: null,
          area: "",
          department: "",
          district: "",
          street: "",
          city: "",
          zipcode: undefined,
          latitude: "",
          longitude: ""
        },
        picture: [],
        user: {
          id: null,
          firstname: "",
          lastname: "",
          email: "",
          roles: []
        },
        place: {
          id: null,
          name: "",
          type: ""
        }
      },
    loading: false,
    error: null
  };
  
  // Récupération des locations depuis l'API :
  export const fetchSingleMemory = createAsyncThunk(
    'singleMemory/fetchSingleMemory',
    async (memoryId : number) => {
      const { data } = await axios.get(`https://admin.auparavant.fr/api/memory/${memoryId}`);
      return data;
    }
  );

  // Suppression d'un souvenir
  export const deleteMemory = createAsyncThunk(
    'createMemory/deleteMemory',
    async (memoryID : number, thunkAPI) => {
      // Récupération du state via la thunkAPI
      const state = thunkAPI.getState() as RootState;
      // Envoi de la requête en DELETE avec l'ID du souvenir en endpoint'
      const { data } = await axios.delete(`https://admin.auparavant.fr/api/secure/delete/memory/${memoryID}`);
      return data;
    }
  )

  const singleMemoryReducer = createReducer(initialState, (builder) => {
    builder
      // Gestion du cas "pending" de la récupération d'un souvenir
      .addCase(fetchSingleMemory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la récupération d'un souvenir
      .addCase(fetchSingleMemory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la récupération d'un souvenir
      .addCase(fetchSingleMemory.fulfilled, (state, action) => {
        state.loading = false;
        state.memory = action.payload;
      })
      // Gestion du cas "pending" de la suppression d'un souvenir
      .addCase(deleteMemory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // Gestion du cas "rejected" de la suppression d'un souvenir
      .addCase(deleteMemory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // Gestion du cas "fullfilled" de la suppression d'un souvenir
      .addCase(deleteMemory.fulfilled, (state) => {
        state.loading = false;
      })
      });
  
  export default singleMemoryReducer;
  
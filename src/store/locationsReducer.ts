import {
    createAsyncThunk,
    createReducer,
  } from '@reduxjs/toolkit';

import axios from 'axios';
import { ILocationCreated } from '../types/location';

  interface LocationsState {
    list: ILocationCreated[] | []
    loading: boolean;
    error: null | string;
  }

  // Déclaration de l'état initial 
  export const initialState: LocationsState = {
    list: [],
    loading: false,
    error: null
  };
  
  // Récupération des locations depuis l'API :
  export const fetchLocations = createAsyncThunk(
    'location/fetchLocations',
    async () => {
      const { data } = await axios.get(`https://admin.auparavant.fr/api/locations`);
      return data;
    }
  );

  const locationsReducer = createReducer(initialState, (builder) => {
        builder
          .addCase(fetchLocations.pending, (state, action) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(fetchLocations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as string;
          })
          .addCase(fetchLocations.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
          })
      });
  
  export default locationsReducer;
  
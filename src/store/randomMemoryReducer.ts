import {
    createAsyncThunk,
    createReducer,
  } from '@reduxjs/toolkit';

  import axios from 'axios';

  import { RandomMemoryData } from '../types/random';

  interface RandomMemory {
    picture: RandomMemoryData
    loading: boolean
    error: null | string;
  }

  export const initialState: RandomMemory = {
    picture: {
      picture1: '',
      picture2: '',
    },
    loading: false,
    error: null,
  };

  export const fetchRandomMemory = createAsyncThunk(
    'random/fetchRamdomMemory',
    async () => {
      const { data } = await axios.get(`https://admin.auparavant.fr/api/memories/random`);
      return data;
    }
  );


  export const randomMemoryReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(fetchRandomMemory.pending, (state) => {     
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomMemory.fulfilled, (state, action) => {
        state.loading = false;
        state.picture = action.payload[0];
      })
      .addCase(fetchRandomMemory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  });
  
  export default randomMemoryReducer;
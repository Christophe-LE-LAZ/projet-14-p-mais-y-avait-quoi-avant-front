import { configureStore } from '@reduxjs/toolkit';
import memoriesReducer from './memoriesReducer'
import userReducer from './userReducer';
import createMemoryReducer from './createMemoryReducer';
import locationsReducer from './locationsReducer';
import randomMemoryReducer from './randomMemoryReducer';
import messageReducer from './messageReducer';
import singleMemoryReducer from './singleMemoryReducer';
import filterReducer from './filterReducer';
import updateMemoryReducer from './updateMemoryReducer';


// Création du store et définition des différents states et de leurs reducers associés

const store = configureStore({
  reducer: {
    memories : memoriesReducer,
    randomMemory: randomMemoryReducer,
    locations: locationsReducer,
    singleMemory : singleMemoryReducer,
    createMemory: createMemoryReducer,
    updateMemory: updateMemoryReducer,
    user: userReducer,
    message : messageReducer,
    filter : filterReducer
  },
});

// Déduction du type 'RootState' et 'AppDispatch' depuis le store lui-même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


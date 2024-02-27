import {
    createAction,
    createReducer,
  } from '@reduxjs/toolkit';
import { IDataCreated } from '../types/memory';

interface filterState {
  area : string,
  department : string,
  city : string,
  type : string,
  years : number[],
  input : string,
  searchedInput : string
  isFiltered : boolean
  isSearched : boolean
  results : IDataCreated[] | []
}

// Déclaration de l'état initial 
export const initialState: filterState = {
  area : "",
  department : "",
  city : "",
  type : "",
  years : [1700, 2050],
  input : "",
  searchedInput : "",
  isFiltered : false,
  isSearched : false,
  results : []
};

// Actions pour la mise à jour du state avec les filtres sélectionnés
export const setArea = createAction<string>('filter/setArea');
export const setDepartment = createAction<string>('filter/setDepartment');
export const setCity = createAction<string>('filter/setCity');
export const setType = createAction<string>('filter/setType');
export const setYears = createAction<number[]>('filter/setYears');

// Actions pour la mise à jour du state avec l'input de la searchbar (onChange / onKeyDown)
export const setInput = createAction<string>('filter/setInput');
export const setSearchedInput = createAction<string>('filter/setSearchedInput');

// Actions pour le stockage des données filtrées / recherchées dans le state
export const filterMemories = createAction<IDataCreated[]>('filter/filterMemories');
export const searchMemories = createAction<IDataCreated[]>('filter/searchMemories');

// Action pour la réinitialisation des filtres
export const resetFilters = createAction('filter/resetFilters');
  
// Création du reducer
const filterReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setInput, (state, action) => {
    state.input = action.payload;
  })
  .addCase(setSearchedInput, (state, action) => {
    state.searchedInput = action.payload;
    state.isFiltered = false;
    state.isSearched = true;
  })
  .addCase(setArea, (state, action) => {
    state.area = action.payload;
    state.isFiltered = true;
    state.isSearched = false;
    state.input = ''
  })
  .addCase(setDepartment, (state, action) => {
    state.department = action.payload;
    state.isFiltered = true;
    state.isSearched = false;
    state.input = ''
  })
  .addCase(setCity, (state, action) => {
    state.city = action.payload;
    state.isFiltered = true;
    state.isSearched = false;
    state.input = ''
  })
  .addCase(setType, (state, action) => {
    state.type = action.payload;
    state.isFiltered = true;
    state.isSearched = false;
    state.input = ''
  })
  .addCase(setYears, (state, action) => {
    state.years = action.payload;
    state.isFiltered = true;
    state.isSearched = false;
  })
  .addCase(filterMemories, (state, action) => {
    state.results = action.payload;
  })
  .addCase(searchMemories, (state, action) => {
    state.results = action.payload;
  })
  .addCase(resetFilters, (state) => {
    state.area = '';
    state.department = '';
    state.city = '';
    state.type = '';
    state.years = [1700, 2050];
    state.input = '';
    state.searchedInput = '';
    state.isFiltered = false;
    state.isSearched = false;
    state.results = []
  })
});
  
  export default filterReducer;
  
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromApartments from './reducers/apartments.reducers';

export const selectApartmentsState = createFeatureSelector<fromApartments.ApartmentState>('apartments');

export const selectAllApartments = createSelector(
  selectApartmentsState,
  fromApartments.selectAll
);

export const selectFavoritesApartments = createSelector(
  selectAllApartments,
  apartments => apartments.filter(course => course.favorite)
);

export const areApartmentsLoaded = createSelector(
  selectApartmentsState,
  state => state.allApartmentsLoaded
);

export const selectAgentInfo = createSelector(
  selectApartmentsState,
  state => state.agentInfo
);

export const selectCurrentSelectedApartment = createSelector(
  selectApartmentsState,
  state => state.selectedApartment
);

export const isSelectedApartmentLoaded = createSelector(
  selectApartmentsState,
  state => state.selectedApartmentLoaded
);

export const selectEditMode = createSelector(
  selectApartmentsState,
  state => state.isEditModeEnabled
);


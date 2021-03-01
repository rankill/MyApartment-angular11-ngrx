import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromApartments from './reducers/apartments.reducers';
import {ApartmentState} from './reducers/apartments.reducers';
import {Apartment} from './model/apartment.model';

export const selectApartmentsState = createFeatureSelector<fromApartments.ApartmentState>('apartments');

export const selectAllApartments = createSelector(
  selectApartmentsState,
  fromApartments.selectAll
);

export const setFilteredApartments = createSelector(
  selectAllApartments,
  selectApartmentsState,
  (apartments: Apartment[], {filters: {bySearch, byFavorite, byCity, byPets, byStreet}}: ApartmentState) =>
    apartments
      .filter(apartment => bySearch ? apartment.name.toLocaleLowerCase().includes(bySearch.toLowerCase()) : true)
      .filter(apartment => byFavorite ? apartment.favorite === byFavorite : true)
      .filter(apartment => byPets ? apartment.pets === byPets : true)
      .filter(apartment => byCity ? apartment.city === byCity : true)
      .filter(apartment => byStreet ? apartment.streetAddress === byStreet : true)
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

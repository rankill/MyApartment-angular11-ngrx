import {createReducer, on} from '@ngrx/store';
import {ApartmentsActions} from '../action-types';
import {AgentInfo} from '../model/agent.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Apartment, ApartmentsFilterTerm} from '../model/apartment.model';

const initialStateFilters: ApartmentsFilterTerm = {
  bySearch: '',
  byFavorite: false,
  byPets: false
};

export interface ApartmentState extends EntityState<Apartment> {
  allApartmentsLoaded: boolean;
  agentInfo: AgentInfo;
  filteredApartments: Apartment;

  selectedApartment: Apartment;
  selectedApartmentLoaded: boolean;

  isEditModeEnabled: boolean;

  filters: ApartmentsFilterTerm;

  apartmentHighlightedId: number;
}

export const adapter = createEntityAdapter<Apartment>({
  selectId: (model: Apartment) => model.propertyID,
});

export const initialApartmentsState = adapter.getInitialState({
  allApartmentsLoaded: false,
  selectedApartmentLoaded: false,
  isEditModeEnabled: false,

  filters: initialStateFilters,
});

export const apartmentsReducer = createReducer(
  initialApartmentsState,
  on(ApartmentsActions.allApartmentsLoaded, (state, {agentInfo, apartments}) => adapter.setAll(
    apartments,
{
        ...state,
        allApartmentsLoaded: true,
        agentInfo,
    }
  )),

  on(ApartmentsActions.apartmentUpdated, (state, action) => adapter.updateOne(action.update, state)),

  on(ApartmentsActions.apartmentSelectedUpdate, (state,  {apartment}) => {
    return { ...state, selectedApartment: apartment };
  }),

  on(ApartmentsActions.apartmentLoaded, (state, { apartment }) => {
    const apartmentFromList = state.entities[apartment.propertyID];
    return {
      ...state,
      selectedApartment: {
        ...apartment,
        // This extra assignation can be removed if there is an endpoint to save the updated apartment location
        // this is for simulate backend and sync properly
        geocode: {
          Latitude: apartmentFromList ? apartmentFromList.geocode.Latitude : apartment.geocode.Latitude,
          Longitude: apartmentFromList ? apartmentFromList.geocode.Longitude : apartment.geocode.Longitude
        }
      },
      selectedApartmentLoaded: true
    };
  }),

  on(ApartmentsActions.clearSelectedApartment, (state) => {
    return { ...state, selectedApartment: undefined, selectedApartmentLoaded: false };
  }),

  on(ApartmentsActions.toggleEditMode, (state) => {
    return { ...state, isEditModeEnabled: !state.isEditModeEnabled};
  }),


  on(ApartmentsActions.updateFilters, (state, {filters}) => {
    return {
      ...state,
      filters: {
        ...state.filters,
        ...filters
      }
    };
  }),

  on(ApartmentsActions.clearFilters, (state) => {
    return {
      ...state,
      filters: initialStateFilters
    };
  }),
);

export const {
  selectAll
} = adapter.getSelectors();

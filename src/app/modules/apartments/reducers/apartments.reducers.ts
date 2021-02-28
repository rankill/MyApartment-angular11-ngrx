import {createReducer, on} from '@ngrx/store';
import {ApartmentsActions} from '../action-types';
import {AgentInfo} from '../model/agent.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Apartment} from '../model/apartment.model';

export interface ApartmentState extends EntityState<Apartment> {
  allApartmentsLoaded: boolean;
  agentInfo: AgentInfo;
  filteredApartments: Apartment;
  selectedApartment: Apartment;
  selectedApartmentLoaded: boolean;
  isEditModeEnabled: boolean;
}

export const adapter = createEntityAdapter<Apartment>({
  selectId: (model: Apartment) => model.propertyID,
});

export const initialApartmentsState = adapter.getInitialState({
  allApartmentsLoaded: false,
  selectedApartmentLoaded: false,
  isEditModeEnabled: false
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
    return { ...state, selectedApartment: apartment, selectedApartmentLoaded: true };
  }),

  on(ApartmentsActions.clearSelectedApartment, (state) => {
    return { ...state, selectedApartment: undefined, selectedApartmentLoaded: false };
  }),

  on(ApartmentsActions.toggleEditMode, (state) => {
    return { ...state, isEditModeEnabled: !state.isEditModeEnabled};
  }),
);

export const {
  selectAll
} = adapter.getSelectors();

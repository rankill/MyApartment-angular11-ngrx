import {createAction, props} from '@ngrx/store';
import {AgentInfo} from './model/agent.model';
import {Update} from '@ngrx/entity';
import {Apartment, ApartmentsFilterTerm} from './model/apartment.model';


/*  AGENT & APARTMENTS ACTIONS */
export const loadAgentData = createAction(
  '[Apartments Resolver] Load Agent Data'
);

export const allApartmentsLoaded = createAction(
  '[Load Agent Data Effect] All Apartments Loaded',
  props<{agentInfo: AgentInfo, apartments: Apartment[]}>()
);

/*   APARTMENT ACTIONS */
export const loadApartment = createAction(
'[Apartments Detail Resolver] Load Apartment',
  props<{apartmentId: string}>()
);

export const apartmentLoaded = createAction(
  '[loadApartment Effect] Apartment loaded',
  props<{apartment: Apartment}>()
);

export const apartmentSelectedUpdate = createAction(
  '[Apartment Detail] Update Selected Apartment',
  props<{apartment: Apartment}>()
);

export const apartmentUpdated = createAction(
  '[Apartment Detail] Update Apartment',
  props<{update: Update<Apartment>}>()
);

export const updateFilters = createAction(
  '[Apartment List] Update Filters',
  props<{filters: ApartmentsFilterTerm}>()
);

export const clearFilters = createAction('[Apartment List] Clear Filters');

export const toggleEditMode = createAction('[Apartment Map View] Toggle Edit mode');

export const clearSelectedApartment = createAction('[Apartment Detail] Clear Selected Apartment');

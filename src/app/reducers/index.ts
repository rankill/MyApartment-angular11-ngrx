import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@env/environment';
import {routerReducer} from '@ngrx/router-store';

export const reducers: ActionReducerMap<{ router: any }> = {
  router: routerReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };

}

export const metaReducers: MetaReducer<{ router: any }>[] = !environment.production ? [logger] : [];

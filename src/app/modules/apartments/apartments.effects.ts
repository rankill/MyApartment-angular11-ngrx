import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApartmentsActions} from './action-types';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {allApartmentsLoaded, apartmentLoaded} from './apartments.actions';
import {ApartmentsService} from './services/apartments.service';
import {Router} from '@angular/router';
import {EMPTY} from 'rxjs';
import {Apartment} from './model/apartment.model';

@Injectable()
export class ApartmentsEffects {

  loadAgentData$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ApartmentsActions.loadAgentData),
        concatMap(action => this.apartmentsService.fetchApartments()),
        map(({agentInfo, records}) => allApartmentsLoaded({agentInfo, apartments: records}))
      )
  );

  loadApartment$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ApartmentsActions.loadApartment),
        concatMap(action => this.apartmentsService.findApartmentById(action.apartmentId)),
        map((apartmentResponse: Apartment) => {
          if (!apartmentResponse.error) {
            return apartmentLoaded({apartment: apartmentResponse});
          }
          throw new Error();
        }),
        catchError((error) => {
          this.router.navigateByUrl('/');
          return EMPTY;
        })
      )
  );

  saveApartmentFavoriteState = createEffect(
    () => this.actions$
      .pipe(
        ofType(ApartmentsActions.apartmentUpdated),
        concatMap(action => {
          const {id, changes} = action.update;
          const isFavorite: boolean = Boolean(changes.favorite);
          return this.apartmentsService.saveApartmentFavoriteState(id, isFavorite);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private apartmentsService: ApartmentsService,
    private router: Router,
  ) {

  }

}

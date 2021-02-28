import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, map, tap} from 'rxjs/operators';
import {ApartmentsActions} from '../action-types';
import {isSelectedApartmentLoaded} from '../apartments.selectors';

@Injectable()
export class ApartmentSelectedResolvers implements Resolve<any>{
  loading = false;
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    const apartmentId = route.paramMap.get('apartmentId');
    return this.store.pipe(
      select(isSelectedApartmentLoaded),
      tap((apartmentsLoaded) => {
        if (!this.loading && !apartmentsLoaded && apartmentId) {
          this.loading = true;
          this.store.dispatch(ApartmentsActions.loadApartment({apartmentId}));
        }
      }),
      filter(apartmentsLoaded => apartmentsLoaded),
      first(),
      finalize(() => this.loading = false)
    );
  }
}

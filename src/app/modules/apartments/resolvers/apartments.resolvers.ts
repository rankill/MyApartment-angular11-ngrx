import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {ApartmentsActions} from '../action-types';
import {areApartmentsLoaded} from '../apartments.selectors';

@Injectable()
export class ApartmentsResolvers implements Resolve<any>{
  loading = false;
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.store.pipe(
      select(areApartmentsLoaded),
      tap((apartmentsLoaded) => {
        if (!this.loading && !apartmentsLoaded) {
          this.loading = true;
          this.store.dispatch(ApartmentsActions.loadAgentData());
        }
      }),
      filter(apartmentsLoaded => apartmentsLoaded),
      first(),
      finalize(() => this.loading = false)
    );
  }
}

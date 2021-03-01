import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AgentInfo} from '../../model/agent.model';
import {select, Store} from '@ngrx/store';
import {selectAgentInfo, setFilteredApartments} from '../../apartments.selectors';
import {ApartmentsActions} from '../../action-types';
import {Apartment, ApartmentsFilterCondition, ApartmentsFilterTerm, FilterTerm} from '../../model/apartment.model';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-apartments',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  apartments$!: Observable<Apartment[]>;
  agentInfo$!: Observable<AgentInfo>;

  extraFilters: ApartmentsFilterCondition[];

  constructor(public store: Store) {
    this.extraFilters = [];
  }

  ngOnInit(): void {
    // Be sure to clean if there is a selected apartment
    this.store.dispatch(ApartmentsActions.clearSelectedApartment());
    this.agentInfo$ = this.store.pipe(select(selectAgentInfo));

    this.apartments$ = this.store.pipe(
      select(setFilteredApartments),
      tap(apartments => {
        if (!this.extraFilters.length) {
          this.buildFilters(apartments);
        }
      })
    );
  }

  trackById(index: number, apartment: Apartment): number {
    return apartment.propertyID;
  }

  launchFilter(filters: ApartmentsFilterTerm): void {
    this.store.dispatch(ApartmentsActions.updateFilters({
      filters
    }));
  }

  buildFilters(apartments: Apartment[]): any {
    const cities: ApartmentsFilterCondition = {
      type: 'City',
      items: [],
      term: FilterTerm.ByCity
    };

    const streets: ApartmentsFilterCondition = {
      type: 'Street',
      items: [],
      term: FilterTerm.ByStreet
    };

    const validateAndPushArray: (array: string[], value: string) => void = (array: string[], value: string) => {
      if (value && !array.includes(value)) {
        array.push(value);
      }
    };

    for (const {city, streetAddress} of apartments) {
      validateAndPushArray(cities.items, city);
      validateAndPushArray(streets.items, streetAddress);
    }

    this.extraFilters.push(cities);
    this.extraFilters.push(streets);
  }
}

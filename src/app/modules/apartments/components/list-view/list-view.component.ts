import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AgentInfo} from '../../model/agent.model';
import {select, Store} from '@ngrx/store';
import {selectAgentInfo, selectAllApartments} from '../../apartments.selectors';
import {ApartmentsActions} from '../../action-types';
import {Apartment} from '../../model/apartment.model';

@Component({
  selector: 'app-list-apartments',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  apartments$!: Observable<Apartment[]>;
  agentInfo$!: Observable<AgentInfo>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Be sure to clean if there is a selected apartment
    this.store.dispatch(ApartmentsActions.clearSelectedApartment());

    this.apartments$ = this.store.pipe(select(selectAllApartments));
    this.agentInfo$ = this.store.pipe(select(selectAgentInfo));
  }

  public trackById(index: number, apartment: Apartment): number {
    return apartment.propertyID;
  }
}

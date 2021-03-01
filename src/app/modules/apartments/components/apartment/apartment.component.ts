import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Apartment} from '../../model/apartment.model';
import {ApartmentsActions} from '../../action-types';
import {select, Store} from '@ngrx/store';
import {selectCurrentSelectedApartment} from '../../apartments.selectors';
import {Update} from '@ngrx/entity';
import {apartmentSelectedUpdate, apartmentUpdated, clearFilters} from '../../apartments.actions';
import {ApartmentsService} from '../../services/apartments.service';

@Component({
  selector: 'app-apartments-detail',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {
  apartment$!: Observable<Apartment>;

  constructor(
    public apartmentsService: ApartmentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.apartment$ = this.store.pipe(select(selectCurrentSelectedApartment));
    // this.store.dispatch(clearFilters());
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }
}

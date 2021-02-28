import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../../model/apartment.model';

@Component({
  selector: 'app-apartment-overview',
  templateUrl: './apartment-overview.component.html',
  styleUrls: ['./apartment-overview.component.scss']
})
export class ApartmentOverviewComponent implements OnInit {
  @Input() apartment!: Apartment;

  constructor() { }

  ngOnInit(): void {
  }

}

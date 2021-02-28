import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../../model/apartment.model';

@Component({
  selector: 'app-apartment-plans',
  templateUrl: './apartment-plans.component.html',
  styleUrls: ['./apartment-plans.component.scss']
})
export class ApartmentPlansComponent implements OnInit {
  @Input() apartment!: Apartment;

  constructor() { }

  ngOnInit(): void {
  }

}

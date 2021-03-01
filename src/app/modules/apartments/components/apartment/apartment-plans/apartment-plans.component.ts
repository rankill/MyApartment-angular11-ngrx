import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../../model/apartment.model';

@Component({
  selector: 'app-apartment-plans',
  templateUrl: './apartment-plans.component.html',
  styleUrls: ['./apartment-plans.component.scss']
})
export class ApartmentPlansComponent implements OnInit {
  @Input() apartment!: Record<string, any>;
  itemsSchema: Record<string, any>[];

  constructor() {
    this.itemsSchema = [
      {
        id: 'bed',
        icon: 'bed'
      }, {
        id: 'bath',
        icon: 'bathtub'
      }, {
        id: 'sqft',
        icon: 'square_foot'
      }
    ];
  }

  ngOnInit(): void {
  }

}

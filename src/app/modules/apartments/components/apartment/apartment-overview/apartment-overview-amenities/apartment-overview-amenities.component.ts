import {Component, Input} from '@angular/core';
import {environment} from '@env/environment.prod';

@Component({
  selector: 'app-apartment-overview-amenities',
  templateUrl: './apartment-overview-amenities.component.html',
  styleUrls: ['./apartment-overview-amenities.component.scss']
})
export class ApartmentOverviewAmenitiesComponent {
  @Input() apartment!: Record<string, any>;
  svgUrl: string;
  amenitiesIndex: {title: string, index: string}[];

  constructor() {
    this.svgUrl = environment.svgUrl;
    this.amenitiesIndex = [
      {
        title: 'High-value Amenities',
        index: 'highValueAmenities'
      },
      {
        title: 'Unit Amenities',
        index: 'unitAmenities'
      },
      {
        title: 'Property Amenities',
        index: 'propertyAmenities'
      },
    ];
  }
}

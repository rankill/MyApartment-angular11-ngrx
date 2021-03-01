import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../../../model/apartment.model';

interface DetailsSchema {
  id: string;
  title: string;
  icon: string;
  dictionary?: {[key: string]: string};
  keys?: string[];
  isValue?: boolean;
}

interface DetailsItem {
  title: string;
  icon: string;
  value?: string;
  items: string[];
}

@Component({
  selector: 'app-apartment-overview-details',
  templateUrl: './apartment-overview-details.component.html',
  styleUrls: ['./apartment-overview-details.component.scss']
})
export class ApartmentOverviewDetailsComponent implements OnInit {
  @Input() apartment!: Record<string, any>;

  private detailsSchema: DetailsSchema[];

  detailsList!: Record<string, any>[];

  constructor() {
    this.detailsList = [];
    this.detailsSchema = [
      {
        id: 'parking',
        icon: 'local_parking',
        title: 'Parking',
        dictionary: {
          covered: 'Covered Parking',
          reserved: 'Reserved'
        }
      },
      {
        id: 'petInfo',
        icon: 'pets',
        title: 'Pets',
        dictionary: {
          allowed: 'Pets allowed',
          limit: 'Max Allowed',
          weight: 'Max Weight'
        }
      },
      {
        id: 'schoolsInfo',
        icon: 'school',
        title: 'School info',
        dictionary: {
          elementry: 'Elemenetry',
          high: 'High',
          intermediate: 'Intermediate',
          middle: 'Middle'
        },
      },
      {
        title: 'Admin Fee',
        icon: 'attach_money',
        id: 'adminFee',
        isValue: true,
      },
      {
        title: 'App Fee',
        icon: 'attach_money',
        id: 'appFee',
        isValue: true,
      }
    ];
  }

  ngOnInit(): void {
    this.detailsSchema.forEach((item) => {
      const currentDetails: DetailsItem = {
        title: item.title,
        icon: item.icon,
        items: [],
        value: ''
      };

      if (item.dictionary) {
        // If it is a single value

        Object.keys(item.dictionary).forEach(key => {
          let currentValue = '';
          const apartmentValue = this.apartment[item.id] && this.apartment[item.id][key];

          if (!apartmentValue) {
            return;
          }

          if (typeof apartmentValue === 'boolean') {
            currentValue = item.dictionary ? item.dictionary[key] : '';
          } else {
            currentValue = `${item.dictionary && item.dictionary[key]}: ${apartmentValue}`;
          }

          currentDetails.items.push(currentValue);
        });

      } else if (item.isValue) {
        // If it is a single value
        currentDetails.value = this.apartment[item.id];
      }

      // Avoid empty items in sections
      if (!item.isValue && !currentDetails.items.length || item.isValue && !currentDetails.value) {
        return;
      }
      this.detailsList.push(currentDetails);

    });
  }
}

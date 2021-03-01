import {Component, Input} from '@angular/core';
import {Apartment} from '../../../model/apartment.model';
import {ApartmentsService} from '../../../services/apartments.service';

@Component({
  selector: 'app-apartments-card',
  templateUrl: './apartment-card.component.html',
  styleUrls: ['./apartment-card.component.scss'],
})
export class ApartmentCardComponent {
  @Input() apartment!: Apartment;
  public isHovered: boolean;

  constructor(public apartmentsService: ApartmentsService) {
    this.isHovered = false;
  }
}

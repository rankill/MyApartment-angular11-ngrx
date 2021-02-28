import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../model/apartment.model';
import {Store} from '@ngrx/store';
import {ApartmentsService} from '../../services/apartments.service';

@Component({
  selector: 'app-apartments-thumbnail',
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

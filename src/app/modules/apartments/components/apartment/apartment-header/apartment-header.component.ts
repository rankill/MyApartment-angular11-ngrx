import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../../model/apartment.model';

@Component({
  selector: 'app-apartment-header',
  templateUrl: './apartment-header.component.html',
  styleUrls: ['./apartment-header.component.scss']
})
export class ApartmentHeaderComponent implements OnInit {
  @Input() apartment!: Apartment;

  constructor() { }

  ngOnInit(): void {
  }

}

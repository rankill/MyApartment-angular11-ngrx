import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApartmentsFilterTerm, ApartmentsFilterCondition} from '../../../model/apartment.model';

@Component({
  selector: 'app-list-view-filters',
  templateUrl: './list-view-filters.component.html',
  styleUrls: ['./list-view-filters.component.scss']
})
export class ListViewFiltersComponent {
  @Input() extraFilters!: ApartmentsFilterCondition[];
  @Output() filtered: EventEmitter<ApartmentsFilterTerm>;
  filterFavorite: boolean;
  isExpanded: boolean;

  constructor() {
    this.filtered = new EventEmitter<ApartmentsFilterTerm>();
    this.filterFavorite = false;
    this.isExpanded = false;
  }

  onFilter(filter: ApartmentsFilterTerm): void {
    this.filtered.emit(filter);
  }

  submitForm({form: {value: filters}}: NgForm): void {
    this.onFilter(filters);
  }

  toggleFavorite(): void {
    this.filterFavorite = !this.filterFavorite;
    this.onFilter({
      byFavorite: this.filterFavorite
    });
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-fav-icon',
  templateUrl: './fav-icon.component.html',
  styleUrls: ['./fav-icon.component.scss']
})
export class FavIconComponent implements OnInit {
  @Input() className: string;
  @Input() isFavorite: boolean;
  @Output() clicked: EventEmitter<boolean>;

  constructor() {
    this.className = '';
    this.isFavorite = false;
    this.clicked = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  onClick(event: Event): void {
    event.stopPropagation();
    this.clicked.emit(this.isFavorite);
  }

}

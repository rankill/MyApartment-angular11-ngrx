import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {MapService} from '../../../services/map/map.service';

import {LngLat, Marker} from 'mapbox-gl';
import {CustomMarker} from '../../../model/map.model';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapMarkerComponent implements OnInit, OnDestroy {
  @Input() marker!: CustomMarker | undefined;
  @Input() isEditable!: boolean;
  @Input() isSelected: boolean;

  @Output() clicked: EventEmitter<CustomMarker>;
  @Output() locationUpdated: EventEmitter<LngLat>;

  markerInstance!: Marker;
  dragging: boolean;

  constructor(
    private store: Store,
    private hostElement: ElementRef,
    private mapService: MapService,
  ) {
    this.clicked = new EventEmitter<CustomMarker>();
    this.locationUpdated = new EventEmitter<LngLat>();
    this.isEditable = false;
    this.isSelected = false;
    this.dragging = false;
  }

  ngOnInit(): void {
    if (this.marker) {
      this.markerInstance = this.mapService.addMarker(this.marker, this.hostElement.nativeElement);
      this.initBindings();
    }
  }

  ngOnDestroy(): void {
    if (this.marker) {
      this.mapService.removeMarkerById(this.marker);
    }
  }

  markerClicked(): void {
    if (!this.dragging) {
    this.clicked.emit(this.marker);
  }
  }

  initBindings(): void {
    if (this.isEditable) {
      this.markerInstance.setDraggable(this.isEditable);

      this.markerInstance.on('dragend', () => {
        this.locationUpdated.emit(this.markerInstance.getLngLat());
        this.dragging = false;
      });

      this.markerInstance.on('dragstart', () => {
        this.dragging = true;
      });
    }

  }
}

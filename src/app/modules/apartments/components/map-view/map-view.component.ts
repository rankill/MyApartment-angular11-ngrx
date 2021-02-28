import {ChangeDetectionStrategy, Component, ElementRef, OnInit} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {Apartment} from '../../model/apartment.model';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CustomMarker} from '../../model/map.model';
import {ApartmentsService} from '../../services/apartments.service';
import {ApartmentsActions} from '../../action-types';
import * as fromApartments from '../../apartments.selectors';

@Component({
  selector: 'app-map',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  apartments$!: Observable<Apartment[]>;
  markers!: CustomMarker[];
  editMode: boolean;

  constructor(
    private store: Store,
    private route: Router,
    private hostElement: ElementRef,
    private mapService: MapService,
    public apartmentsService: ApartmentsService,
  ) {
    this.editMode = false;
  }


  static getValidApartments(apartmentsList: Apartment[], selectedApartment: Apartment): Apartment[] {
    if (apartmentsList?.length && !selectedApartment) { // Full Apartments list
      return apartmentsList;
    } else if (selectedApartment) { // Specific Apartment
      return [selectedApartment];
    }
    return [];
  }

  ngOnInit(): void {
    this.store.pipe(select(fromApartments.selectEditMode)).subscribe((editMode) => {
      console.log('Edit mode', editMode);
      this.editMode = editMode;
    });

    this.mapService.buildMap(this.hostElement.nativeElement);
    this.apartments$ = combineLatest([
      this.store.pipe(select(fromApartments.selectAllApartments)),
      this.store.pipe(select(fromApartments.selectCurrentSelectedApartment))
    ]).pipe(
      map(([apartmentsList, selectedApartment]) => {
        // This validation below ensures that only on the exact condition the markers get rendered and avoid unnecessary effects
        const apartments = MapViewComponent.getValidApartments(apartmentsList, selectedApartment);
        return this.parseApartmentsMarkers(apartments);
      }),
      distinctUntilChanged(),
      tap(apartments => {
        console.log('Launch fly effect');
        if (apartments?.length) {
          this.handleFlyMapSideEffect(apartments);
        }
      })
    );
  }

  createMarker(apartment: Apartment): CustomMarker {
    return {
      id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      coordinates: {
        lon: +apartment.geocode.Longitude,
        lat: +apartment.geocode.Latitude
      },
      title: apartment.name,
      data: apartment,
      isFavorite: apartment.favorite
    };
  }

  onMarkerClicked(marker: CustomMarker, isMulti: boolean): void {
    if (isMulti) {
      const markerApartment = marker.data;
      this.route.navigate([markerApartment.propertyID]);
    }
  }

  /**
   * Side effect to add fly implementation to map on every apartments store change
   */
  handleFlyMapSideEffect(apartments: Apartment[]): void {
    if (apartments.length > 1) {
      this.mapService.goToMarkersBounds(this.getAllApartmentsCoords(apartments));
    } else if (apartments.length === 1)  {
      const {marker} = apartments[0];
      if (marker) {
        this.mapService.goToMarker(marker.coordinates);
      }
    }
  }

  getAllApartmentsCoords(apartments: Apartment[]): [number, number][] {
    return apartments.map(({geocode}) => [+geocode.Longitude, +geocode.Latitude]);
  }

  trackById(index: number, apartment: Apartment): number {
    return apartment.propertyID;
  }

  toggleEditMode(): void {
    this.store.dispatch(ApartmentsActions.toggleEditMode());
  }

  private parseApartmentsMarkers(apartments: Apartment[]): Apartment[] {
    return apartments.map(apartment => ({
        ...apartment,
        marker: this.createMarker(apartment)
    }));
  }
}


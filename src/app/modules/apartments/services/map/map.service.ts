import {ComponentRef, Injectable, Injector} from '@angular/core';
import { environment } from '@env/environment';
import {LngLatLike, Marker, Map, Popup, LngLatBounds} from 'mapbox-gl';
import {CenterOnMarkersControl} from './controls/center-on-markers';
import {CustomMarker} from '../../model/map.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: Map;
  accessToken: string;
  style!: string;

  mapMarkers: {marker: CustomMarker, instance: Marker}[];

  // Controls
  centerOnMarkersControl = new CenterOnMarkersControl();

  constructor() {
    this.mapMarkers = [];
    this.accessToken = environment.mapBoxToken;
    this.style = `${environment.mapStyle}=${ environment.maptilerToken}`;
  }

  buildMap(container: string | HTMLElement): void {
    const lat = 0;
    const lng = 0;
    const zoom = 4;

    this.map = new Map({
      container,
      accessToken: this.accessToken,
      style:  this.style,
      zoom,
      center: [lng, lat],
      logoPosition: 'top-right'
    });

    this.centerOnMarkersControl.onPressed(() => {
      this.goToMarkersBounds();
    });
    this.map.addControl(this.centerOnMarkersControl, 'bottom-left');
  }

  addMarker(marker: CustomMarker, element: HTMLElement): Marker {
    const markerInstance = new Marker(element)
      .setLngLat(marker.coordinates)
      .setPopup(new Popup({ offset: 25 })
        .setHTML(`<h3>${marker.title}</h3>`))
      .addTo(this.map);

    this.mapMarkers[marker.id] = ({
      marker,
      instance: markerInstance
    });

    console.log(this.mapMarkers);
    return markerInstance;
  }

  removeMarkerById(customMarker: CustomMarker): void {
    const markerToRemove = this.mapMarkers[customMarker.id];
    if (markerToRemove) {
      markerToRemove.instance.remove();

      /**
       * The code blow illustrates why I decided to use delete instead of filter
       * The time log benchmark show a difference of about 39 ms in favor of delete instruction
       * Note: Uncomment log to implement benchmark
       */
      // console.time('deleting');
      // this.mapMarkers.filter(({marker}) => marker.id !== customMarker.id);
      delete this.mapMarkers[customMarker.id];
      // console.timeEnd('deleting');
    }
  }

  goToMarker(center: LngLatLike): void {
    this.map.flyTo({
      center,
      zoom: 18,
      duration: 2000,
      curve: 1,
      essential: true
    });
  }

  goToMarkersBounds(coordinatesList?: LngLatLike[]): void {
    if (!coordinatesList && !this.mapMarkers.length) {
      return;
    }

    const currentCoords = coordinatesList || this.mapMarkers.map(({instance}) => instance.getLngLat());

    const markersBounds = currentCoords.reduce((bounds, coords) => {
      return bounds.extend(coords);
    }, new LngLatBounds(currentCoords[0], currentCoords[0]));

    this.map.fitBounds(markersBounds, {
      padding: 80,
      essential: true
    });
  }
}

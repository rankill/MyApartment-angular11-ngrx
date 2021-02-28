import {LngLatLike} from 'mapbox-gl';

export interface CustomMarker {
  id: number;
  coordinates: LngLatLike;
  title: string;
  data: any;
  isFavorite: boolean;
}

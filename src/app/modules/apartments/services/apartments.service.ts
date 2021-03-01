import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {Agent} from '../model/agent.model';
import {Apartment} from '../model/apartment.model';
import {Update} from '@ngrx/entity';
import {apartmentSelectedUpdate, apartmentUpdated} from '../apartments.actions';
import {Store} from '@ngrx/store';
import {LngLat} from 'mapbox-gl';

@Injectable()
export class ApartmentsService {

  constructor(private http: HttpClient, private store: Store) {}

  fetchApartments(): Observable<Agent> {
    return this.http.get<Agent>(`${environment.apiUrl}/listItems.aspx`, {
      params: new HttpParams()
        .set('listID', environment.listID)
        .set('token', environment.token)
        .set('receipt', '')
    });
  }

  findApartmentById(id: string): Observable<Apartment> {
    return this.http.get<Apartment>(`${environment.apiUrl}/propertyItem.aspx`, {
      params: new HttpParams()
        .set('listID', environment.listID)
        .set('token', environment.token)
        .set('propertyID', id)
    });
  }


  saveApartmentFavoriteState(id: string | number, isFavorite: boolean): Observable<string> {
    return this.http.post(`${environment.apiUrl}/updateListItem.aspx`,
      {
        listID: environment.listID,
        token: environment.token,
        propertyID: id,
        isFavorite
      }, {
        responseType: 'text'
      }
    );
  }

  // Helpers
  toggleFavorite(apartment: Apartment, updateSelected = false): void {
    const tempApartment: Apartment = { ...apartment};

    tempApartment.favorite = !apartment.favorite;

    const update: Update<Apartment> = {
      id: tempApartment.propertyID,
      changes: {
        favorite: tempApartment.favorite
      }
    };

    this.launchApartmentUpdate(update, tempApartment, updateSelected);
  }

  updateApartmentLocation(apartment: Apartment, newCoords: LngLat, updateSelected = false): void {
    const tempApartment: Apartment = { ...apartment};

    tempApartment.geocode = {
      Longitude: String(newCoords.lng),
      Latitude: String(newCoords.lat),
      Percision: tempApartment.geocode.Percision,
      IsValid: tempApartment.geocode.IsValid
    };

    const update: Update<Apartment> = {
      id: tempApartment.propertyID,
      changes: {
        geocode: tempApartment.geocode
      }
    };

   // Here we would call our service to update our apartment - Currently the endpoint is the same as favorite
    this.launchApartmentUpdate(update, tempApartment, updateSelected);
  }

  launchApartmentUpdate(update: Update<Apartment>, apartment: Apartment, updateSelected: boolean): void {
    this.store.dispatch(apartmentUpdated({update}));

    if (updateSelected) {
      this.store.dispatch(apartmentSelectedUpdate({apartment}));
    }
  }
}

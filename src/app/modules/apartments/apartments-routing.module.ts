import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListViewComponent} from './components/list-view/list-view.component';

import {ApartmentComponent} from './components/apartment/apartment.component';
import {ApartmentsResolvers} from './resolvers/apartments.resolvers';
import {HomeComponent} from './components/home/home.component';
import {ApartmentSelectedResolvers} from './resolvers/apartment-selected.resolvers';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ListViewComponent,
        data: {
          title: 'List'
        },
        resolve: {
          apartments: ApartmentsResolvers
        },
      },
      {
        path: ':apartmentId',
        component: ApartmentComponent,
        data: {
          title: 'Detail',
          id: 'apartmentId'
        },
        resolve: {
          selectedApartment: ApartmentSelectedResolvers
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ApartmentsRoutingModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

// Routing Modules
import {ApartmentsRoutingModule} from './apartments-routing.module';

// Components
import {HomeComponent} from './components/home/home.component';
import {MapViewComponent} from './components/map-view/map-view.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {ApartmentComponent} from './components/apartment/apartment.component';
import {MapMarkerComponent} from './components/map-view/map-marker/map-marker.component';
import {ApartmentCardComponent } from './components/apartment-card/apartment-card.component';

import {ApartmentGalleryComponent} from './components/apartment/apartment-gallery/apartment-gallery.component';
import {ApartmentPlansComponent} from './components/apartment/apartment-plans/apartment-plans.component';
import {ApartmentOverviewComponent} from './components/apartment/apartment-overview/apartment-overview.component';
import {ApartmentHeaderComponent} from './components/apartment/apartment-header/apartment-header.component';

// Services
import {MapService} from './services/map/map.service';
import {ApartmentsService} from './services/apartments.service';

// Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';

// Store
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ApartmentsEffects} from './apartments.effects';
import {ApartmentsResolvers} from './resolvers/apartments.resolvers';
import {apartmentsReducer} from './reducers/apartments.reducers';

// 3rd Party
import {ApartmentSelectedResolvers} from './resolvers/apartment-selected.resolvers';
import {SharedModule} from '../../shared/shared.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {ApartmentGalleryDialogComponent} from './components/apartment/apartment-gallery/apartment-gallery-dialog/apartment-gallery-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApartmentsRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    EffectsModule.forFeature([ApartmentsEffects]),
    StoreModule.forFeature('apartments', apartmentsReducer)
  ],
  declarations: [
    HomeComponent,
    MapViewComponent,
    ListViewComponent,
    MapMarkerComponent,
    ApartmentCardComponent,

    ApartmentComponent,
    ApartmentHeaderComponent,
    ApartmentGalleryComponent,
    ApartmentPlansComponent,
    ApartmentOverviewComponent,
    ApartmentGalleryDialogComponent
  ],
  providers: [
    MapService,
    ApartmentsService,
    ApartmentsResolvers,
    ApartmentSelectedResolvers
  ]
})
export class ApartmentsModule { }

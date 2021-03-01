import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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

import {ApartmentOverviewDetailsComponent} from './components/apartment/apartment-overview/apartment-overview-details/apartment-overview-details.component';
import {ApartmentOverviewAmenitiesComponent} from './components/apartment/apartment-overview/apartment-overview-amenities/apartment-overview-amenities.component';
import {ApartmentGalleryDialogComponent} from './components/apartment/apartment-gallery/apartment-gallery-dialog/apartment-gallery-dialog.component';
import {ListViewFiltersComponent} from './components/list-view/list-view-filters/list-view-filters.component';

// Services
import {MapService} from './services/map/map.service';
import {ApartmentsService} from './services/apartments.service';

// Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

// Store
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ApartmentsEffects} from './apartments.effects';
import {ApartmentsResolvers} from './resolvers/apartments.resolvers';
import {apartmentsReducer} from './reducers/apartments.reducers';
import {ApartmentSelectedResolvers} from './resolvers/apartment-selected.resolvers';

// 3rd Party
import {SharedModule} from '../../shared/shared.module';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApartmentsRoutingModule,
    FormsModule,
    LayoutModule,
    SharedModule,

    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,

    EffectsModule.forFeature([ApartmentsEffects]),
    StoreModule.forFeature('apartments', apartmentsReducer),
    ReactiveFormsModule
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
    ApartmentOverviewDetailsComponent,
    ApartmentOverviewAmenitiesComponent,

    ApartmentGalleryDialogComponent,
    ListViewFiltersComponent


  ],
  providers: [
    MapService,
    ApartmentsService,
    ApartmentsResolvers,
    ApartmentSelectedResolvers
  ]
})
export class ApartmentsModule { }

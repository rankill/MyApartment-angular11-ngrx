import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';

import {FooterComponent} from './components/footer/footer.component';
import {Title} from '@angular/platform-browser';
import {filter, map} from 'rxjs/operators';
import {ApartmentsModule} from '../modules/apartments/apartments.module';
import {MapService} from '../modules/apartments/services/map/map.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ApartmentsModule,
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  providers: [
    MapService
  ]
})
export class CoreModule {

  private appName = 'My Apartment';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    // Logic to update angular title with route data: {title: [title_value]}
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.title) {
            return child.snapshot.data.title;
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe( (data: any) => {
      if (data) {
        this.titleService.setTitle(`${data} - ${this.appName}`);
      }
    });
  }
}

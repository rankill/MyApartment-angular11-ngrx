import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showMap: boolean;
  tabletPortraitUp$: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver) {
   this.tabletPortraitUp$ = breakpointObserver.observe(['(min-width: 600px)']).pipe(map( ({matches}) => matches));
   this.showMap = false;
  }
}

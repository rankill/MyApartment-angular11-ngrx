// @ts-ignore
import {TestBed, waitForAsync} from '@angular/core/testing';
// @ts-ignore
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {FooterComponent} from './core/components/footer/footer.component';

describe('AppComponent', () => {
  beforeEach( waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LoadingBarHttpClientModule
      ],
      declarations: [
        AppComponent,
        FooterComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MyApartment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MyApartment');
  });
});

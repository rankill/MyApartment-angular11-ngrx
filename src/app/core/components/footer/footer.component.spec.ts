// @ts-ignore
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [LoadingBarHttpClientModule],
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

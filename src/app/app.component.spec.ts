import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have 'app-nav' element in app component`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const navElement = fixture.debugElement.query(By.css('app-nav'));
    expect(navElement).toBeTruthy();
  }));
  it(`should have 'router-outlet' element in app component`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const routerElement = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerElement).toBeTruthy();
  }));
});

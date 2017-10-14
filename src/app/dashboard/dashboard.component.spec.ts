import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http
        },
        {
          provide: MdSnackBar
        }
      ],
      declarations: [ 
        DashboardComponent 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 1 input element to search movie in Dashboard component`, async(() => {
    const inputElement = fixture.debugElement.queryAll(By.css('input'));
    expect(inputElement.length).toBe(1);
  }));

  it(`should have 1 button element in Dashboard component`, async(() => {
    const buttonElement = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElement.length).toBe(1);
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http
        },
        {
          provide: MdSnackBar
        },
        {
          provide: Router
        },
        RegistrationService
      ],
      declarations: [ 
        RegistrationComponent 
      ],
      imports:[
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 4 input element in app component`, async(() => {
    const inputElement = fixture.debugElement.queryAll(By.css('input'));
    expect(inputElement.length).toBe(4);
  }));

  it(`should have 1 button element in app component`, async(() => {
    const buttonElement = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElement.length).toBe(1);
  }));

  it('should have "Register" as text on Button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.innerHTML.trim()).toEqual('Register');
  });
});

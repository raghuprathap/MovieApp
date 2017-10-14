import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        LoginService
      ],declarations: [ 
        LoginComponent 
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 2 input element in app component`, async(() => {
    const inputElement = fixture.debugElement.queryAll(By.css('input'));
    expect(inputElement.length).toBe(2);
  }));

  it(`should have 1 button element in app component`, async(() => {
    const buttonElement = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElement.length).toBe(1);
  }));

  it('should have "Login" as text on Button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.innerHTML.trim()).toEqual('Login');
  });
});

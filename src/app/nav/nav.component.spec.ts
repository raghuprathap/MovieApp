import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MdMenuModule } from '@angular/material';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let isUserLoggedIn: boolean;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavComponent 
      ],
      imports:[
        MdMenuModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Menu Toolbar', () => {
    const menuToolbarElements = fixture.debugElement.query(By.css('md-toolbar'));
    expect(menuToolbarElements).toBeTruthy();
  });

  it('should have Menu', () => {
    const menuElements = fixture.debugElement.query(By.css('md-menu'));
    expect(menuElements).toBeTruthy();
  });
});

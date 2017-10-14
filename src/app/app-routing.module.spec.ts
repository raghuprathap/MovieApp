import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { AppComponent } from './app.component';
import { RoutingComponents, routes } from './app-routing.module';

describe('Router navigation ', () => {
	let location: Location;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule.withRoutes(routes)
			],
			declarations:[
				AppComponent,
				RoutingComponents
			],
			schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
		});
		router = TestBed.get(Router);
		location = TestBed.get(Location);
	});

	/*it('fakesync works', fakeAsync(() => {
		let promise = new Promise((resolve) => {
			setTimeout(resolve, 10);
		});
		let done = false;
		promise.then(() => done = true);
		tick(50);
		expect(done).toBeTruthy();		
	}));*/

	it('"" redirects to /', fakeAsync(() => {
		router.navigate(['/']).then(() => {
      expect(location.path()).toBe('/');
    });
	}));

	it('"dashboard" redirects to /dashboard', fakeAsync(() => {
		router.navigate(['/dashboard']).then(() => {
      expect(location.path()).toBe('/dashboard');
    });
	}));

	it('"login" redirects to /login', fakeAsync(() => {
		router.navigate(['/login']).then(() => {
      expect(location.path()).toBe('/login');
    });
	}));

	it('"registration" redirects to /registration', fakeAsync(() => {
		router.navigate(['/register']).then(() => {
      expect(location.path()).toBe('/register');
    });
	}));

	it('"favourite" redirects you to /favourite', fakeAsync(() => {
    router.navigate(['/favourite']).then(() => {
      expect(location.path()).toBe('/favourite');
    });
  }));

});
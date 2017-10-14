import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService{

	constructor(private http: Http){
	}

	register(firstName, lastName, email, password){
		let data = new URLSearchParams();
		data.append('firstName', firstName);
		data.append('lastName', lastName);
		data.append('email', email);
		data.append('password', password);

		return this.http.post('api/user/register', data)
			.map(res => res.json());
	}
}
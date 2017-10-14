import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService{

	constructor(private http: Http){
	}

	login(email, password){
		let data = new URLSearchParams();
		data.append('email', email);
		data.append('password', password);

		return this.http.post('api/user/login', data)
			.map(res => res.json());
	}
}
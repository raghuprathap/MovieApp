import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class FavouriteService{

	constructor(private http: Http){
	}

	getFavouriteMovies(){
		let data = new URLSearchParams();
    	data.append('userId', localStorage.getItem('userId'))
		return this.http.post('api/movie/view', data)
      .map(res => res.json());
	}

	deleteMovie(movieId){
		let body = {
      id: movieId
    };
    var obj = {id: movieId, userId: localStorage.getItem('userId')};
    let options = new RequestOptions({
       body: obj
    })
		return this.http.delete('api/movie/delete', options)
			.map(res => res.json());
	}

}
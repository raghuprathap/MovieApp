import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService{

	constructor(private http: Http){
	}

	getMovies(title){
		// return this.http.get('api/movie/search/'+title)
		return this.http.get('api/movie/movies?search='+title)
      .map(res => res.json())
	}

	addToFavorite(movie){
		let data = new URLSearchParams();
		const userId = localStorage.getItem('userId');
		data.append('imdbID', movie.id);
		data.append('userId', userId);
		data.append('title', movie.title);
		data.append('poster', movie.poster_path);
		data.append('voteAverage', movie.vote_average);
		data.append('voteCount', movie.vote_count);
		data.append('realeaseDate', movie.release_date);
		// return this.http.post('api/movie/add', data)
		return this.http.post('api/movie/users/'+localStorage.getItem('userId')+'/movies', data)
			.map(res => res.json());
	}
}
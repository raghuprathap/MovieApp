import { Component, OnInit } from '@angular/core';
import { FavouriteService } from './favourite.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
  providers: [FavouriteService]
})

export class FavouriteComponent implements OnInit {
	heading: string;
	imagePath: string;
  movies: any;
  favoriteLogo = "assets/favorite.jpg";
  totalFavMovies: number;

  constructor(private favouriteService: FavouriteService, private snackBar: MdSnackBar) { 
		this.heading = "Movies to watch before I die";
		this.imagePath  = "assets/movieLogo.jpg";
  }

  ngOnInit() {
  	this.favouriteService.getFavouriteMovies().subscribe(movies => {
      this.movies = (movies.data);
      this.totalFavMovies = this.movies.length;
    });
  }

  delete(movieId){
    this.favouriteService.deleteMovie(movieId).subscribe(response => {
      if(response.success){
        this.movies = this.movies.filter((movie) => {
          return movie.imdbID !== movieId;
        });
      this.totalFavMovies = this.movies.length;
        this.openSnackBar(response.message);
      }
    })
  }

  openSnackBar(message: string){
    this.snackBar.open(message,'Ok', {
      duration: 2000
    });
  }

}

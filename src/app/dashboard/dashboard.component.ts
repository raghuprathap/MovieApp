import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ DashboardService ]
})
export class DashboardComponent{
  movies: string[];
  heading: string;
  imagePath: string;
  clickedId: number;
  showDetail: boolean;

  constructor(private dashboardService: DashboardService, private snackBar: MdSnackBar) { 
    this.heading = "Search Movie & Add to your Favourite list";
    this.imagePath  = "assets/movieLogo.jpg";
    this.showDetail = false;
  }

  openSnackBar(message: string){
    this.snackBar.open(message,'Ok', {
      duration: 2000
    });
  }

  search(title){
    this.dashboardService.getMovies(title).subscribe(movies => {
      this.movies = (movies.data.results);
    });
  }

  addToFavorite(movieDetail){
    this.dashboardService.addToFavorite(movieDetail).subscribe(response => {
      this.openSnackBar(response.message);
    })
  }

  detail(movieId){
    if(this.clickedId == movieId){
      this.showDetail = !this.showDetail;
    }else{
      this.clickedId = movieId;
      this.showDetail = true;
    }    
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{
  title: string = "Movie App";
  isUserLoggedIn: boolean;

  constructor() {
  	this.isUserLoggedIn = (localStorage.getItem('token') === null )? false: true;
  }

}

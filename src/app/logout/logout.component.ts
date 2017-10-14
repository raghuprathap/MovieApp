import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent{

  constructor(private router: Router) { 
  	localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.reload();
    this.router.navigate(['']);
  }

}

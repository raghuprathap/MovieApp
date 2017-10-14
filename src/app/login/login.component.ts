import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from  '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { LoginService } from './login.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent {
	loginLogo: string;
	emailFormControl: FormControl;
	passwordFormControl: FormControl;
  isFormValidated: boolean = true;

  constructor(private loginService: LoginService, private snackBar: MdSnackBar, private router: Router) {
  	this.loginLogo  = "assets/loginLogo.png";
  	this.emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);
	  this.passwordFormControl = new FormControl('', [
	    Validators.required]);
  }

  login(email, password){
    if(email == "" || password == ""){
      this.isFormValidated = false;
      return;
    }
  	this.loginService.login(email, password).subscribe(response => {
      this.openSnackBar(response.message);
      if(response.success){
        window.location.reload();
        this.router.navigate(['/dashboard']);
        localStorage.setItem('userId', email);
        localStorage.setItem('token', response.token);
      }else{
        if(response.message === "You are not registered user"){
          this.router.navigate(['/register']);
        }
      }
    })
  }

  openSnackBar(message: string){
    this.snackBar.open(message,'Ok', {
      duration: 2000
    });
  }

}

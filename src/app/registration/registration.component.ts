import { Component } from '@angular/core';
import { FormControl, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { RegistrationService } from './registration.service';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent {
	registrationLogo: string;
	heading: string;
	emailFormControl: FormControl;
	passwordFormControl: FormControl;
	firstNameFormControl: FormControl;
	lastNameFormControl: FormControl;
  isFormValidated: boolean = true;

  constructor(private registrationService: RegistrationService, private snackBar: MdSnackBar, private router: Router) { 
  	this.registrationLogo  = "assets/registrationlogo.jpg";
  	this.heading = "Registration Form";
  	this.emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);
	  this.passwordFormControl = new FormControl('', [
	    Validators.required]);
	  this.lastNameFormControl = new FormControl('', [
	    Validators.required]);
	  this.firstNameFormControl = new FormControl('', [
	    Validators.required]);
  }
  
  register(firstName, lastName, email, password){
    if(firstName == "" || lastName == "" || email == "" || password == ""){
      this.isFormValidated = false;
      return;
    }
  	this.registrationService.register(firstName, lastName, email, password).subscribe(response => {
      this.openSnackBar(response.message);
      if(response.success){
      	this.router.navigate(['/login']);
      }
    })
  }

  openSnackBar(message: string){
    this.snackBar.open(message,'Ok', {
      duration: 2000
    });
  }
}

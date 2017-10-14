import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';


// Define the routes
export const routes: Routes = [
	{
		path: '',
		component: (localStorage.getItem('token') === null) ? LoginComponent: DashboardComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'favourite',
		component: FavouriteComponent
	},
	{
		path: 'register',
		component: RegistrationComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'logout',
		component: LogoutComponent
	}
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule{};
export const RoutingComponents = [DashboardComponent, FavouriteComponent, RegistrationComponent, LoginComponent, LogoutComponent];
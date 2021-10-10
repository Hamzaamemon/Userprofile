// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import {AuthorizationService} from '../../../../../Services/Authorization.service'
import { Router } from '@angular/router';
@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;
	user: any;
	FullName: string;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private authorizationService :AuthorizationService ,private store: Store<AppState>,private router : Router) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// this.user$ = this.store.pipe(select(currentUser));
		debugger;
		this.user = this.authorizationService.getUser();
		// this.token =this.authorizationService.getToken();
		this.FullName = this.user.data.firstName+" "+this.user.data.lastName;
		// let FirstName = this.user.firstName;
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}

	onLogout() {
		debugger;
		// alert("Logout");
		this.authorizationService.Logout().then((x) => {
		  // this.router.navigateByUrl(['/auth/login']);
			  this.router.navigateByUrl("/auth/login");
		})
	  }
}

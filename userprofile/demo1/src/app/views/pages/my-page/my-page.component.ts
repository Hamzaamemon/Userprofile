import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../Services/Authorization.service';
import { SubheaderService } from '../../../core/_base/layout';
// import {}from 

@Component({
  selector: 'kt-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService,private router : Router,private subheaderService:SubheaderService) { }

  ngOnInit() {
    // if (!this.user.id) {
		// 	this.subheaderService.setTitle('Create user');
		// 	this.subheaderService.setBreadcrumbs([
		// // 		{ title: 'User Management', page: `user-management` },
		// // 		{ title: 'Users',  page: `user-management/users` },
		// 		{ title: 'My Page', page: `my-page` }
		// 	]);
			// return;
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../Services/Authorization.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {
  Login: FormGroup;
  Email: string;
  Password: string;
  massage: string;
  dataSaved = false;
  submitted: boolean = false;
  userdata: any;

  constructor(private authorizationService: AuthorizationService, private router: Router) {
    this.Login = new FormGroup({
      Email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      Password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
  }
  onFormSubmit() {
    this.LoginUser();
  }
  LoginUser() {
    // debugger;
    this.submitted = true;
    if (this.Login.invalid) {
      return;
    }
    this.authorizationService.LoginUser(this.Email, this.Password).subscribe((res) => {
      if (res.isSucesss) {
        // debugger;
        this.authorizationService.setUser(res);        
        this.massage = 'Login Successfully';
        alert(this.massage);
        this.dataSaved = true;
        this.router.navigate(['/UserProfile']);
      }
      else {
        this.massage = 'Login failed';
        alert(this.massage);
      }
    })

  }
}

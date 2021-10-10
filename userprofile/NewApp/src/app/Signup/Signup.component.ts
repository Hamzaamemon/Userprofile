import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../Services/Authorization.service'
import { User } from '../Models/User.model'

@Component({
  selector: 'app-Signup',
  templateUrl: './Signup.component.html',
  styleUrls: ['./Signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('ProfilePicture', { static: true }) ProfilePicture
  massage: string;
  dataSaved = false;
  SignupUser: FormGroup;
  EmployeeId = "0";
  submitted: boolean = false;
  url: any;
  fileToUpload: File = null;
  imageUrl: string;
  data: any = {};
  constructor(private router: Router, private authorizationService: AuthorizationService) {
    this.SignupUser = new FormGroup({
      FirstName: new FormControl("", [Validators.required]),
      LastName: new FormControl("", [Validators.required]),
      Email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      PhoneNumber: new FormControl("", [Validators.required, Validators.pattern("(03)[0-9 ]{9}")]),
      Password: new FormControl("", [Validators.required]),
      ProfilePicture: new FormControl("", [Validators.required]),

    });
  }

  ngOnInit() {
    this.imageUrl = './assets/blank-dp.jpg';
  }

  onSelectFile(file: FileList) {
    debugger;
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  CreateUser() {
    debugger;
    let formData = new FormData();
    formData.append('FirstName', this.SignupUser.value.FirstName);
    formData.append('LastName', this.SignupUser.value.LastName);
    formData.append('Email', this.SignupUser.value.Email);
    formData.append('PhoneNumber', this.SignupUser.value.PhoneNumber);
    formData.append('Password', this.SignupUser.value.Password);
    formData.append('img', this.ProfilePicture.nativeElement.files[0]);
    this.submitted = true;
    if (this.SignupUser.invalid) {
      return;
    }
    this.authorizationService.CreateUser(formData).subscribe((res) => {
      if (res.isSucesss) {
        debugger;
        this.massage = 'Signup Saved Successfully';
        alert(this.massage);
        this.dataSaved = true;
        this.router.navigate(['/Login']);
      }
      else {
        this.massage = 'Signup failed';
        alert(this.massage);
      }
    })
  }
  delete() {
    this.url = null;
  }
  onSignup() {
    const user = this.SignupUser.value;
    this.CreateUser();
  }
  onLogin() {
    this.router.navigate(['/Login']);
  }

}

import { Component, Input, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from '../Login/Login.component';
import { User } from '../Models/User.model';
import { AuthorizationService } from '../Services/Authorization.service';
// import { Console } from 'console';
@Component({
  selector: 'app-User-Profile',
  templateUrl: './User-Profile.component.html',
  template: ``,
  styleUrls: ['./User-Profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('logoInput', { static: true }) logoInput
  message: any;
  dataSaved = false;
  userProfile: FormGroup;
  EmployeeId = "0";
  FirstName: any;
  LastName: any;
  Email: any;
  PhoneNumber: any;
  Password: any;
  submitted: boolean = false;
  fileToUpload: File = null;
  // @ViewChild(LoginComponent) login: LoginComponent;
  // @Input() userdata:any;
  user: any;
  id: string;
  date: any;
  temperatureC: any;
  temperatureF: any;
  summary: any;
  imageUrl: string;
  WeatherData: any = [];

  constructor(private router: Router, private authorizationService: AuthorizationService) {
    this.userProfile = new FormGroup({
      FirstName: new FormControl("", [Validators.required]),
      LastName: new FormControl("", [Validators.required]),
      Email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      PhoneNumber: new FormControl("", [Validators.required, Validators.pattern("(03)[0-9 ]{9}")]),
      Password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.user = this.authorizationService.getUser();
    this.id = this.user.data.userId;
    this.FirstName = this.user.data.firstName;
    this.LastName = this.user.data.lastName;
    this.Email = this.user.data.email;
    this.PhoneNumber = this.user.data.phoneNumber;
    this.Password = this.user.data.password;
    // debugger;
    this.imageUrl = this.user.data.imagePath;
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
  onLogout() {
    debugger;
    // alert("Logout");
    this.authorizationService.Logout().then((x) => {
      this.router.navigate(['/Login']);
    })
  }
  onEdit() {
    this.EditUser();
  }
  Getdata() {
    this.authorizationService.GetData().subscribe((res) => {
      // debugger
      this.WeatherData = res;
      this.WeatherData.filter((x) => {
        this.date = x.date;
        this.temperatureC = x.temperatureC;
        this.temperatureF = x.temperatureF;
        this.summary = x.summary;
      })

    })
  }
  EditUser() {
    // debugger;
    let formData = new FormData();
    formData.append('FirstName', this.userProfile.value.FirstName);
    formData.append('LastName', this.userProfile.value.LastName);

    formData.append('Email', this.userProfile.value.Email);

    formData.append('PhoneNumber', this.userProfile.value.PhoneNumber);

    formData.append('Password', this.userProfile.value.Password);
    // debugger;
    if (this.logoInput.nativeElement.files[0] == null) {
      this.imageUrl = this.user.data.imagePath;
    }
    else {
      formData.append('img', this.logoInput.nativeElement.files[0]);
    }
    this.submitted = true;
    if (this.userProfile.invalid) {
      return;
    }
    let UserId = this.user.data.userId
    this.authorizationService.EditUser(UserId, formData).subscribe((res) => {
      if (res.isSucesss) {
        // debugger;
        this.message = 'Profile Edit Successfully';
        alert(this.message);
        this.dataSaved = true;
      }
      else {
        this.message = 'Edit failed';
        alert(this.message);
      }
    })

  }
}

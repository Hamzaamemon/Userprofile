import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../Services/Authorization.service';
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
@Component({
  selector: 'kt-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() greeting = true;
  @ViewChild('ProfilePicture', { static: true }) ProfilePicture
  @ViewChild('FileUpload', { static: true }) FileUpload

  user: any;
  userProfile: FormGroup;
  FullName: string;
  // fileToUpload: File = null;
  imageUrl: string;
  id: string;
  Loading: boolean = false;
  FirstName: any;
  LastName: any;
  Email: any;
  PhoneNumber: any;
  Password: any;
  fileToUpload: File = null;
  submitted: boolean = false;
  // dataSaved = false;
  // message: any;
  constructor(private authorizationService: AuthorizationService, private router: Router
    , private cdr: ChangeDetectorRef) {
    this.userProfile = new FormGroup({
      FirstName: new FormControl("", [Validators.required]),
      LastName: new FormControl("", [Validators.required]),
      Email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      PhoneNumber: new FormControl("", [Validators.required, Validators.pattern("(03)[0-9 ]{9}")]),
      Password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.Loading = false;
    // this.imageUrl = '../../../../assets/media/users/blank.png';
    debugger;
    this.onLoadData();

  }

  onSelectFile(file: FileList) {
    debugger;
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      debugger;
      this.imageUrl = event.target.result;
      this.cdr.detectChanges();

    }
    reader.readAsDataURL(this.fileToUpload);
    // this.cdr.detectChanges();
  }
  // ionViewDidEnter() {
  //   // ...
  //   debugger;
  //   this.onLoadData();
  // }

  files: File[] = [];

  onSelect(event) {
    debugger;
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onEdit() {

    this.EditUser();
  }
  EditUser() {
    debugger
    // debugger;
    let formData = new FormData();
    formData.append('FirstName', this.userProfile.value.FirstName);
    formData.append('LastName', this.userProfile.value.LastName);
    formData.append('Email', this.userProfile.value.Email);
    formData.append('PhoneNumber', this.userProfile.value.PhoneNumber);
    formData.append('Password', this.userProfile.value.Password);
    // debugger;
    if (this.ProfilePicture.nativeElement.files[0] == null) {
      this.imageUrl = this.user.data.imagePath;
    }
    else {
      formData.append('img', this.ProfilePicture.nativeElement.files[0]);
    }
    this.files.forEach((file) => { formData.append('MultpleFiles', file); });
    this.Loading = true;
    this.submitted = true;
    if (this.userProfile.invalid) {
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to edit your profile?',
      // text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      // cancelButtonText: 'Cancel'
    }).then((Result) => {
      if (Result.isConfirmed) {
        let UserId = this.user.data.userId
        this.authorizationService.EditUser(UserId, formData).subscribe((res) => {
          if (res.isSucesss) {
            debugger;
            Swal.fire(
              'Edited!',
              res.message,
              // ='Your imaginary file has been Edited.'
              'success'
            )
            this.Loading = false;
            debugger;
            this.authorizationService.setUpdateDataUser(res.data).then((x) => {
              //   setTimeout(() => {       
              //   }, 10000);

              // location.reload();
            });
            this.onLoadData();

            // this.authorizationService.getUser()
            // this.message = 'Profile Edit Successfully';
            // alert(this.message);
            // this.dataSaved = true;

          }

          else {
            debugger;
            this.Loading = false;
            this.cdr.detectChanges();

            // Swal.fire(
            //   'Cancelled',
            //   res.message,
            //   // 'Your imaginary file is safe :)',
            //   'error'
            // )
            // this.router.navigateByUrl("/error/403");
            // this.message = 'Edit failed';
            // alert(this.message);
          }
        })
      }
      else {
        this.Loading = false;
        this.cdr.detectChanges();
      }
    })

  }
  onLoadData() {
    debugger;
    // this.submitted = true;
    this.Loading = false;
    this.user = this.authorizationService.getUser();
    this.id = this.user.data.userId;
    this.FirstName = this.user.data.firstName;
    this.LastName = this.user.data.lastName;
    this.Email = this.user.data.email;
    this.PhoneNumber = this.user.data.phoneNumber;
    this.Password = this.user.data.password;
    // debugger;
    this.imageUrl = this.user.data.imagePath;
    console.log(this.id, this.FirstName, this.LastName, this.Email, this.PhoneNumber)
    debugger;
    this.FullName = this.user.data.firstName + " " + this.user.data.lastName;
    this.cdr.detectChanges();
  }


}

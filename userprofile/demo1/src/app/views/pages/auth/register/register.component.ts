// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthorizationService } from '../../../../Services/Authorization.service';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	// styleUrls: ['./app.component.scss'],
	styleUrls: ['./register.component.scss'],

	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	@ViewChild('ProfilePicture', { static: true }) ProfilePicture
	registerForm: FormGroup;
	loading: boolean = false;
	errors: any = [];
	imageUrl: string;
	massage: string;
	dataSaved = false;
	// SignupUser: FormGroup;
	EmployeeId = "0";
	submitted: boolean = false;
	url: any;
	fileToUpload: File = null;
	data: any = {};

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private authorizationService: AuthorizationService
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
		this.imageUrl = '../../../../assets/media/users/blank.png';
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}
	onSelectFile(file: FileList) {
		debugger;
		this.fileToUpload = file.item(0);
		var reader = new FileReader();
		reader.onload = (event: any) => {
		  this.imageUrl = event.target.result;
		  this.cdr.detectChanges();
		}
		reader.readAsDataURL(this.fileToUpload);
	  }
	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			ProfilePicture: ['', Validators.compose([
				Validators.required,
				// Validators.minLength(3),
				// Validators.maxLength(100)
			])
			],
			FirstName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			LastName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			Email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				Validators.maxLength(320)
			]),
			],
			// PhoneNumber: new FormControl("", [Validators.required, Validators.pattern("(03)[0-9 ]{9}")]),
			PhoneNumber: ['', Validators.compose([
				Validators.required,
				Validators.pattern("(03)[0-9 ]{9}")
				// Validators.minLength(3),
				// Validators.maxLength(100)
			]),
			],
			Password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			// confirmPassword: ['', Validators.compose([
			// 	Validators.required,
			// 	Validators.minLength(3),
			// 	Validators.maxLength(100)
			// ])
			// ],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			// validator: ConfirmPasswordValidator.MatchPassword
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		debugger;
		const controls = this.registerForm.controls;
		this.loading = true;
		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}	
		if (!controls.agree.value) {
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
		}
		debugger;
		let formData = new FormData();
		formData.append('FirstName', this.registerForm.value.FirstName);
		formData.append('LastName', this.registerForm.value.LastName);
		formData.append('Email', this.registerForm.value.Email);
		formData.append('PhoneNumber', this.registerForm.value.PhoneNumber);
		formData.append('Password', this.registerForm.value.Password);
		// formData.append('img', this.registerForm.value.ProfilePicture);

		formData.append('img', this.ProfilePicture.nativeElement.files[0]);
		// this.submitted = true;
		// if (this.registerForm.invalid) {
		//   return;
		// }
		this.authorizationService.CreateUser(formData).subscribe((res) => {
		  if (res.isSucesss) {
			debugger;
			this.massage = res.message;
			alert(this.massage);
			this.dataSaved = true;
			this.router.navigate(['/Login']);
		  }
		  else {
			this.massage = res.message;
			alert(this.massage);
		  }
			this.loading = false;
			this.cdr.detectChanges();
		})

		// const _user: User = new User();
		// _user.clear();
		// _user.email = controls.email.value;
		// _user.username = controls.username.value;
		// _user.fullname = controls.fullname.value;
		// _user.password = controls.password.value;
		// _user.roles = [];
		// this.auth.register(_user).pipe(
		// 	tap(user => {
		// 		if (user) {
		// 			this.store.dispatch(new Register({authToken: user.accessToken}));
		// 			// pass notice message to the login page
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
		// 			this.router.navigateByUrl('/auth/login');
		// 		} else {
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 		}
		// 	}),
		// 	takeUntil(this.unsubscribe),
		// 	finalize(() => {
		// 		this.loading = false;
		// 		this.cdr.markForCheck();
		// 	})
		// ).subscribe();
	}
	// CreateUser() {
	// 	debugger;
	// 	let formData = new FormData();
	// 	formData.append('FirstName', this.registerForm.value.FirstName);
	// 	formData.append('LastName', this.registerForm.value.LastName);
	// 	formData.append('Email', this.registerForm.value.Email);
	// 	formData.append('PhoneNumber', this.registerForm.value.PhoneNumber);
	// 	formData.append('Password', this.registerForm.value.Password);
	// 	formData.append('img', this.ProfilePicture.nativeElement.files[0]);
	// 	this.submitted = true;
	// 	if (this.registerForm.invalid) {
	// 	  return;
	// 	}
	// 	this.authorizationService.CreateUser(formData).subscribe((res) => {
	// 	  if (res.isSucesss) {
	// 		debugger;
	// 		this.massage = 'Signup Saved Successfully';
	// 		alert(this.massage);
	// 		this.dataSaved = true;
	// 		this.router.navigate(['/Login']);
	// 	  }
	// 	  else {
	// 		this.massage = 'Signup failed';
	// 		alert(this.massage);
	// 	  }
	// 	})
	//   }


	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}

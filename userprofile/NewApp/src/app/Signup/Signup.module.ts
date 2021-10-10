import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './Signup.component';
import { FormGroup , FormControl  , FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormGroup,
    FormsModule,
    FormControl
    
  ],
  declarations: [SignupComponent],
  bootstrap: [SignupComponent]
})
export class SignupModule { }

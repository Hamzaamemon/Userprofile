import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Signup/Signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AlertModule } from 'ngx-bootstrap';
import { LoginComponent } from './Login/Login.component';
import { UserProfileComponent } from './User-Profile/User-Profile.component';

import { TokenInterceptor } from './interceptor/jwt.interceptor';
@NgModule({
  declarations: [	
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserProfileComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

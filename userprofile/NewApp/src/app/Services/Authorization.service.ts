import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  url: string = environment.baseUrl;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient) { }
  isAuthenticated() {
    debugger;
    let currentUser = localStorage.getItem('LoginUser');
    if (currentUser && currentUser.length > 0) {
      return true;
    }
    return false;
  }
  getToken() {
    let currentUser = JSON.parse(localStorage.getItem('LoginUser'));
    if (currentUser) {
      return currentUser.token;
    }
    return null
  }
  CreateUser(data: FormData) {
    // debugger;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };

    return this.http.post<any>(this.url + '/Signup', data, httpOptions)
  }
  GetData() {
    debugger;
    return this.http.get(this.url + '/WeatherForecast')
  }
  LoginUser(Email, Password) {
    // debugger;
    var obj = { Email: Email, Password: Password }
    return this.http.post<any>(this.url + '/Login', obj)
  }
  EditUser(UserId, data: FormData) {
    // debugger;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };
    return this.http.put<any>(this.url + '/UserProfile/' + UserId, data, httpOptions)
  }
  setUser(user: any) {
    // debugger;
    localStorage.setItem('LoginUser', JSON.stringify(user));
  }
  getUser() {
    // debugger;
    return JSON.parse(localStorage.getItem('LoginUser'));
  }
  Logout(): any {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve(true);
    })

  }
}

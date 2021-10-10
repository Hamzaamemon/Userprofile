import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../Models/User.model';
// import { JwtHelperService } from '@auth0/angular-jwt';
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
  // private _refreshNeeded$ = new Subject<void>();
  // get refreshNeeded$()
  // {
  //   return this._refreshNeeded$;
  // }
  getToken() {
    let currentUser = JSON.parse(localStorage.getItem('LoginUser'));
    if (currentUser) {
      return currentUser.token;
    }
    return null
  }
  CreateUser(data: FormData) {
    debugger;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };

    return this.http.post<any>(this.url + '/Signup', data, httpOptions)
  }
  setUpdateDataUser(user: any)
  {
    // localStorage.('LoginUser');
    return new Promise((resolve, reject)=>{
      var userdate =JSON.parse(localStorage.getItem('LoginUser'));
      userdate.data["firstName"]= user.firstName
      userdate.data["lastName"]= user.lastName
      userdate.data["email"]= user.email
      userdate.data["phoneNumber"]= user.phoneNumber
      userdate.data["password"]= user.password
      userdate.data["imagePath"]= user.imagePath
      localStorage.setItem('LoginUser', JSON.stringify(userdate));
      resolve(true);
    })
   
  }
  GetData() {
    debugger;
    return this.http.get(this.url + '/WeatherForecast')
  }
  LoginUser(Email, Password) {
    debugger;
    var obj = { Email: Email, Password: Password }
    return this.http.post<any>(this.url + '/Login', obj)
  }
  EditUser(UserId, data: FormData) {
    debugger;
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // const httpOptions = {
    //   headers: headers
    // };
  
    return this.http.put<any>(this.url + '/UserProfile/' + UserId, data)
  }
  setUser(user: any) {
    debugger;
    localStorage.setItem('LoginUser', JSON.stringify(user));
  }
  // : Observable<any[]>
  getUser() {
    debugger;
    return JSON.parse(localStorage.getItem('LoginUser'));
  }

  Logout(): any {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve(true);
    })

  }
}

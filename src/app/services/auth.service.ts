import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('myToken') != null) {
      this.setUSerInfo();
    } else {
      this.removeUserInfo();
    }
  }

  baseURL: string = 'https://route-egypt-api.herokuapp.com/';
  currentUser = new BehaviorSubject<any>(null);

  registerNewUser(obj: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}signup`, obj);
  }
  loginUser(obj: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}signin`, obj);
  }
  setUSerInfo() {
    let token = localStorage.getItem('myToken');
    this.currentUser.next(jwtDecode(<string>token));
  }
  removeUserInfo() {
    localStorage.removeItem('myToken');
    this.currentUser.next(null);
  }
}

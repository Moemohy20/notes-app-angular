import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {}

  baseURL: string = 'https://route-egypt-api.herokuapp.com/';
  addNoteService(obj: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}addNote`, obj);
  }
  getAllUsersNotes(): Observable<any> {
    let id = this._AuthService.currentUser.getValue()._id;
    let token = localStorage.getItem('myToken');
    let obj = {
      Token: <string>token,
      userID: id,
    };
    return this._HttpClient.get(`${this.baseURL}getUserNotes`, {
      headers: obj,
    });
  }
  deleteNote(obj: any): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}deleteNote`, { body: obj });
  }
  updateNote(obj: any): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}updateNote`, obj);
  }
}

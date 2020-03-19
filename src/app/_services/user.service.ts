import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/admin', { responseType: 'text' });
  }

  getAllUsers(){
    return this.http.get(API_URL + 'users/all');
  }

  getAllAdmins(){
    return this.http.get(API_URL + 'users/admins');
  }

  onDeleteUser(idUser:number){
    return this.http.delete(API_URL + 'users/delete?id='+idUser);
  }

  onDeleteAdmin(idAdmin:number){
    return this.http.get(API_URL + 'users/admins/delete?id='+idAdmin);
  }

  onGetUserById(idUser:number){
    return this.http.get(API_URL + 'users/one?id='+idUser);
  }
}

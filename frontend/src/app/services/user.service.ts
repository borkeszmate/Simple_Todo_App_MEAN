import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.http;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    this.http.post(`${this.apiUrl}/api/user/register`, user).subscribe(response => console.log(response));
  }
}

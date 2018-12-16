import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.http;
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    this.http.post(`${this.apiUrl}/api/user/register`, user).subscribe(response => console.log(response));
  }

  getToken() {
    return this.token;
  }

  loginUser(user) {
    this.http.post<any>(`${this.apiUrl}/api/user/login`, user).subscribe(response => {
      console.log(response.message);
      if (response.user) {
        localStorage.setItem('MEAN_token', response.user.token);
        this.router.navigate(['']);
      }
    });
  }

  logoutUser() {
    localStorage.removeItem('MEAN_token');
  }

   isAuthenticated() {
    const token = {
      token: localStorage.getItem('MEAN_token')
    };

    const httpOptions = {
      headers: new HttpHeaders({
        authtoken: localStorage.getItem('MEAN_token')
      })
    };
    // console.log(token);
    this.http.post<any>(`${this.apiUrl}/api/user/isAuthenticated`, '', httpOptions).pipe(
      map(res => {
        return res.isAuthenticated;
      })
      );
  }


}

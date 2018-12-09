import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.http;
  private token: string;
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    this.http.post(`${this.apiUrl}/api/user/register`, user).subscribe(response => console.log(response));
  }

  getToken() {
    return this.token;
  }

  loginUser(user) {
    this.http.post(`${this.apiUrl}/api/user/login`, user).subscribe(response => {
      localStorage.setItem('MEAN_token', response.user.token);
      this.router.navigate(['']);
    });
  }
}

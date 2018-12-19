
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  apiUrl = environment.http;

  constructor(
    private userService: UserService,
    private router: Router
    ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (localStorage.getItem('MEAN_token') === null || localStorage.getItem('MEAN_token') === undefined) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.userService.isAuthenticated().pipe(
      map((res => {
        // if (!res.isAuthenticated) {
        //   this.router.navigate(['/login']);
        //   return false;
        // }
        if (!res.isAuthenticated) {
          this.router.navigate(['/login']);
          return false;
        }
        
        return true;

      })
    );

  }
}

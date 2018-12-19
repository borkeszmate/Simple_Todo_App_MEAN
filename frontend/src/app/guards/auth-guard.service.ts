import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
    ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   const auth =  this.userService.getIsAuth();
   console.log(auth);
   if (!auth) {
    this.router.navigate(['/login']);
   } else {
    return auth;
   }

  }
}

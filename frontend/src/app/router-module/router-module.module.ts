import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from '../guards/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [AuthGuardService] },
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuardService
  ],
  exports: [
    RouterModule
  ],
})
export class RouterModuleModule { }

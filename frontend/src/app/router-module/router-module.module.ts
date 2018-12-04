import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { RegisterComponent } from '../components/register/register.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RouterModuleModule { }

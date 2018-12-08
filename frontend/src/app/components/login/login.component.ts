import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  loginForm;
  user = {
    email: '',
    password: ''
    };

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email : new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  onLoginSubmit() {
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    this.userService.loginUser(this.user);

  }

}

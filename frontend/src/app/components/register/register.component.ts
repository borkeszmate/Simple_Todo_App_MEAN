import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  registerForm;
  user: User = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit() {
    this.createRegisterform();
  }

  createRegisterform() {
    this.registerForm = new FormGroup({
      email : new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  onRegisterSubmit() {
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    this.user.confirmPassword = this.registerForm.value.confirmPassword;
    this.userService.registerUser(this.user);

  }
}

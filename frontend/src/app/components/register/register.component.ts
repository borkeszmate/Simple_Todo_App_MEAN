import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  registerForm;

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
    console.log(this.registerForm);
  }
}

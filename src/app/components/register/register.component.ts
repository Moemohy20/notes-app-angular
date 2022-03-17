import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var particlesJS: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/JSON/particlesjs-config.json');
  }

  errorMsg: string = '';
  registerDone: string = '';
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(80),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{3,10}$/),
    ]),
  });

  register() {
    this._AuthService.registerNewUser(this.registerForm.value).subscribe(
      (res) => {
        if (res.message == 'success') {
          this.registerDone = 'Register Sucess';
          this._Router.navigate(['/login']);
        }
      }, //success rsponse
      (err) => {
        this.errorMsg = err.message;
        console.log(this.errorMsg);
      } // error happened
      // () => {} // final action anyway
    );
  }
}

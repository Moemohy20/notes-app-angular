import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/JSON/particlesjs-config.json');
  }

  errMsg: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{3,10}$/),
    ]),
  });
  login() {
    this._AuthService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        if (res.message == 'success') {
          localStorage.setItem('myToken', res.token);
          this._AuthService.setUSerInfo();
          this._Router.navigate(['/profile']);
        } else {
          this.errMsg = res.message;
        }
      },
      (err) => {
        this.errMsg = err.message;
      }
    );
  }
}

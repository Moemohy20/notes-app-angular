import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }
  logout() {
    this._AuthService.removeUserInfo();
    this._Router.navigate(['/login']);
  }
}

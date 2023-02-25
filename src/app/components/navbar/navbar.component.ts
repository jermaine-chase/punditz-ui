import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, IUser} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean;
  user: IUser;
  constructor(private router: Router, private cognitoService: AuthService) {
    this.isAuthenticated = false;
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.cognitoService.isAuthenticated()
      .then(async (success: boolean) => {
        this.isAuthenticated = success;
        if (success) {
          this.user = await this.cognitoService.getCurrentAuthenticatedUser();
        }
      });
  }

  public signOut(): void {
    this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/signIn']);
      });
  }

  isAdmin() {
    return this.cognitoService.isAdmin()
  }
}

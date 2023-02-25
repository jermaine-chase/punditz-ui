import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  confirm: boolean;
  loading: boolean;
  user: IUser;

  constructor(private router: Router, private cognitoService: AuthService) {
    this.confirm = false;
    this.loading = false;
    this.user = {admin: false} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.cognitoService.signUp(this.user)
      .then(() => {
        this.loading = false;
        this.confirm = true;
      }).catch((error) => {
        console.log(error);
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/login']);
      }).catch(() => {
      this.loading = false;
    });
  }

}

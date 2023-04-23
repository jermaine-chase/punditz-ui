import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, AuthService } from "../../services/auth.service";
import {AwsService} from "../../services/aws.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  confirm: boolean;
  loading: boolean;
  user: IUser;

  constructor(private router: Router, private cognitoService: AuthService, private aws: AwsService) {
    this.confirm = false;
    this.loading = false;
    this.user = {admin: false} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.cognitoService.signUp(this.user)
      .then(() => {;
        this.aws.saveToDb('/user', {'username': this.user.username}).then(()=> {
          this.loading = false;
        })
      }).catch((error) => {
        console.log(error);
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
      .then(() => {
        this.confirm = true;
        this.router.navigate(['/login']);
      }).catch(() => {
      this.loading = false;
    });
  }

}

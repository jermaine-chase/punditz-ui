import { Component } from '@angular/core';
import {AuthService, IUser} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;
  user = {} as IUser

  constructor(private router: Router,private authService: AuthService, private shared: SharedService) {}

  onSubmit() {
    this.authService.signIn(this.user).then((result) => {
      this.shared.populateUser(result);
      this.router.navigate(['/main']);
    }).catch((error) => {
      console.error('Error logging in:', error);
    });
  }
}

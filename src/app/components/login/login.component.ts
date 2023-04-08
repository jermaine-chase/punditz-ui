import { Component } from '@angular/core';
import {AuthService, IUser} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;
  user = {} as IUser
  returnUrl: string = "";

  constructor(private router: Router,private authService: AuthService, private shared: SharedService, private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main'
  }

  onSubmit() {
    this.authService.signIn(this.user).then((result) => {
      this.shared.populateUser(result);
      this.router.navigate([this.returnUrl]);
    }).catch((error) => {
      console.error('Error logging in:', error);
    });
  }
}

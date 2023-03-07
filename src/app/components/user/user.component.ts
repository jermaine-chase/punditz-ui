import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loading: boolean;
  users: any;
  constructor(private auth: AuthService) {
    this.loading = true;
  }

  async ngOnInit() {
    this.users = await this.auth.getAllUsers();
    this.loading = false;
  }

}

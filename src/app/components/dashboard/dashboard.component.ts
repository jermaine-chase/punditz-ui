import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared/shared.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private shared: SharedService, private auth: AuthService) { }

  async ngOnInit() {
    if (!this.shared.getUser()) {
      this.shared.setUser(await this.auth.getCurrentAuthenticatedUser())
    }
  }

  getUser() {
    return this.shared.getUser()
  }

  isAdmin() {
    return this.getUser()?.admin
  }

  fetchTeams() {

  }

  fetchMatches() {

  }

  calculateCycleScores() {

  }

  createCycles() {

  }
}

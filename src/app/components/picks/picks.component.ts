import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Urls} from "../../urls";

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.css']
})
export class PicksComponent implements OnInit {
  matchCallMade = false;
  points = ['--', '6', '8', '10', '20', '40']
  matches = []
  teams = []
  teamsMap: any
  url = '/cycle/'
  cycle: any;
  now = new Date()
  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.cycle = this.backend.get(Urls.mainUrl + this.url)
    this.getMatches()
    this.getTeams()
  }

  cycleCount() {
    let list = []
    for (let i = 1; i <= this.cycle.cycleNumber + 3; i++) {
      list.push(i)
    }
    return list
  }

  getMatches() {
    if (this.backend.matches.length === 0 && !this.matchCallMade) {
      this.matchCallMade = true
      this.backend.getMatches('2021').subscribe((data: any) => {
        this.backend.matches = data.matches
        this.matches = data.matches
      })
    } else if (this.backend.matches.length > 0) {
      this.matches = this.backend.matches
    } else {
      this.matches.forEach((value: any) =>{
        let ht = value.homeTeam
        let at = value.awayTeam
        ht['tla'] = this.teamsMap.get(ht.id).tla
        at['tla'] = this.teamsMap.get(at.id).tla
      })
    }
    return this.matches
  }

  getTeams() {
    if (this.backend.teams.length === 0) {
      this.backend.getTeams('2021').subscribe((data: any) => {
        this.teams = data.teams
        this.backend.teams = data.teams
        this.teamsMap = new Map(this.teams.map((obj) => [obj['id'], obj]))
      })
    } else if (this.backend.teams.length > 0) {
      this.teams = this.backend.teams
      this.teamsMap = new Map(this.teams.map((obj) => [obj['id'], obj]))
    }
    return this.teams
  }

  submit() {

  }

  clear() {

  }

  checkSuperPick() {

  }
}

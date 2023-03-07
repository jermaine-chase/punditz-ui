import { Component, OnInit } from '@angular/core';
import {PredictionsForm} from "../../shared/forms";

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {

  constructor() {
    this.predictionsForm = {
      teams: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    }

    this.usedTeams = []

    this.teamsList = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
  }

  teamsList: string[][];
  usedTeams: string[]
  allTeams = ['Arsenal FC', 'Aston Villa FC', 'Chelsea FC', 'Everton FC', 'Fulham FC', 'Liverpool FC', 'Manchester City FC', 'Manchester United FC', 'Newcastle United FC', 'Tottenham Hotspur FC', 'Wolverhampton Wanderers FC', 'Leicester City FC', 'Southampton FC', 'Leeds United FC', 'Nottingham Forest FC', 'Crystal Palace FC', 'Brighton &amp; Hove Albion FC', 'Brentford FC', 'West Ham United FC', 'AFC Bournemouth']
  predictionsForm: PredictionsForm;

  ngOnInit(): void {
  }

  populateTeams(rank: number) {
    let value = this.predictionsForm.teams[rank]
    this.teamsList[rank] = this.allTeams
      .filter(c => {
        console.log(c, value)
        c.startsWith(value)
      })
      .slice(0, 5);
  }

  selectOption(i: number, s: string) {
    this.predictionsForm.teams[i] = s;
    this.teamsList[i] = [];
  }
}

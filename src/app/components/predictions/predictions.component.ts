import {Component, OnInit} from '@angular/core';
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
  }

  loadedFromDb = false

  allTeams = ['Arsenal FC', 'Aston Villa FC', 'Chelsea FC', 'Everton FC', 'Fulham FC', 'Liverpool FC', 'Manchester City FC', 'Manchester United FC', 'Newcastle United FC', 'Tottenham Hotspur FC', 'Wolverhampton Wanderers FC', 'Leicester City FC', 'Southampton FC', 'Leeds United FC', 'Nottingham Forest FC', 'Crystal Palace FC', 'Brighton & Hove Albion FC', 'Brentford FC', 'West Ham United FC', 'AFC Bournemouth']
  predictionsForm: PredictionsForm;

  ngOnInit(): void {
  }

  chooseTeam(team: string, idx: number) {
    for (let i in this.predictionsForm.teams) {
      if (this.predictionsForm.teams[i] === '') {
        this.predictionsForm.teams[i] = team;
        break;
      }
    }
    this.allTeams.splice(idx, 1);
  }

  removeTeam(index: number) {
    this.allTeams.push(this.predictionsForm.teams[index]);
    this.predictionsForm.teams.splice(index, 1);
    this.predictionsForm.teams.push('');
  }

  submit() {
    let dbObject = {
      teams: this.predictionsForm.teams
    }
    this.loadedFromDb = true;
  }

  reset() {
    this.allTeams = ['Arsenal FC', 'Aston Villa FC', 'Chelsea FC', 'Everton FC', 'Fulham FC', 'Liverpool FC', 'Manchester City FC', 'Manchester United FC', 'Newcastle United FC', 'Tottenham Hotspur FC', 'Wolverhampton Wanderers FC', 'Leicester City FC', 'Southampton FC', 'Leeds United FC', 'Nottingham Forest FC', 'Crystal Palace FC', 'Brighton & Hove Albion FC', 'Brentford FC', 'West Ham United FC', 'AFC Bournemouth']
    this.predictionsForm = {
      teams: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    }
  }
}

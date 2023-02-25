import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {MatchDTO, TeamDTO} from "../../model/MatchResponseInterface";
import {SharedService} from "../../shared/shared.service";
import {PicksForm} from "../../shared/forms";

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.css']
})
export class PicksComponent implements OnInit {

  pointsOptions = [
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
    {
      options: [
        {value: 0, label: '--'},
        {value: 6, label: '6'},
        {value: 8, label: '8'},
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 40, label: '40'}
      ]
    },
  ]
  superPickIndex: number = -1;
  matches: MatchDTO[] = []
  teams:TeamDTO[] = []
  cycle: any = {cycleNumber: 22}
  now = new Date()
  loading = false;
  picksForm: PicksForm = {
    picks: [
      {
        gameId: 0,
        team: '--',
        points: 0
      },
      {
        gameId: 1,
        team: '--',
        points: 0
      },
      {
        gameId: 2,
        team: '--',
        points: 0
      },
      {
        gameId: 3,
        team: '--',
        points: 0
      },
      {
        gameId: 4,
        team: '--',
        points: 0
      },
      {
        gameId: 5,
        team: '--',
        points: 0
      },
      {
        gameId: 6,
        team: '--',
        points: 0
      },
      {
        gameId: 7,
        team: '--',
        points: 0
      },
      {
        gameId: 8,
        team: '--',
        points: 0
      },
      {
        gameId: 9,
        team: '--',
        points: 0
      }]
    }
  constructor(private backend: BackendService, private share: SharedService) {
    this.share.populateTeams().then(
      ()=>{
        this.share.populateMatches().then(
          ()=> {
            this.teams = this.share.getTeams()
            this.matches = this.share.getMatches()
            this.loading = false;
            this.setForm();
          }
        )
      }
    );
  }

  ngOnInit() {
    this.loading = true;
    // this.cycle = this.backend.getCycles()
  }

  getMatches() {
    console.log('getting matching from ui')
    return this.matches.filter(m => m.matchday === this.cycle.cycleNumber)
  }

  cycleCount() {
    let list = []
    for (let i = 1; i <= this.cycle.cycleNumber + 3; i++) {
      list.push(i)
    }
    return list
  }

  submit() {
    // post picksForm to service

  }

  clear() {
    this.picksForm = {
      picks: [
        {
          gameId: 0,
          team: '--',
          points: 0
        },
        {
          gameId: 1,
          team: '--',
          points: 0
        },
        {
          gameId: 2,
          team: '--',
          points: 0
        },
        {
          gameId: 3,
          team: '--',
          points: 0
        },
        {
          gameId: 4,
          team: '--',
          points: 0
        },
        {
          gameId: 5,
          team: '--',
          points: 0
        },
        {
          gameId: 6,
          team: '--',
          points: 0
        },
        {
          gameId: 7,
          team: '--',
          points: 0
        },
        {
          gameId: 8,
          team: '--',
          points: 0
        },
        {
          gameId: 9,
          team: '--',
          points: 0
        }]
    };
    for (let i = 0; i < 10; i++) {
      this.picksForm.picks[i].gameId = this.getMatches()[i].id
    }
  }

  setForm() {
    // TODO: get db picks
    let picks = undefined
    if (picks) {
      // TODO: populate this.picks
    } else {
      this.clear();
    }
  }

  checkSuperPick(index: number) {
    let superPickUsed = false;
    let p = this.picksForm.picks[index];
    if (p.points > 10) {
      superPickUsed = true;
      this.superPickIndex = index;
    }

    if (superPickUsed) {
      // Remove options from all select inputs after the current one
      for (let i = 0; i < this.pointsOptions.length; i++) {
        if (i === index) {
          continue;
        }
        // const selectedIndex = options.findIndex(option => option.value === selectedValue);
        this.pointsOptions[i].options = this.pointsOptions[i].options.filter(option => option.value <= 10)
      }
    } else if (this.superPickIndex === index && p.points < 10) {
      for (let i = 0; i < this.pointsOptions.length; i++) {
        if (i === index) {
          continue;
        }
        if (this.pointsOptions[i].options.length === 4) {
          this.pointsOptions[i].options.push({value: 20, label: '20'})
          this.pointsOptions[i].options.push({value: 40, label: '40'})
        }
      }
    }
  }
}

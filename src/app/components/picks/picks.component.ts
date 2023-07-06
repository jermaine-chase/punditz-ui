import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {MatchDTO, TeamDTO} from "../../model/MatchResponseInterface";
import {SharedService} from "../../shared/shared.service";
import {PicksForm} from "../../shared/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CycleDTO} from "../../model/CycleDTO";

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
  teams:TeamDTO[] = []
  cycles: CycleDTO[] = []
  cycle = {} as CycleDTO
  cyclePicker: number = 0;
  now = new Date()
  loading = false;
  picksForm  = {} as PicksForm
  constructor(private router: Router, private route: ActivatedRoute,
              private backend: BackendService, private share: SharedService) {
    this.loading = true;
    this.route.params.subscribe(params => this.cyclePicker = params['cycle']?parseInt(params['cycle'], 10):this.cycle.cycleNumber)
    this.share.populateTeams().then(
      ()=>{
        this.share.populateMatches().then(
          ()=> {
            this.teams = this.share.getTeams()
            this.cycle = this.share.getCurrentCycle()
            this.loading = false;
            this.setForm();
          }
        )
      }
    );
  }

  ngOnInit() {
    // this.cycle = this.backend.getCycles()
    if (this.cyclePicker === 0) {
      this.cyclePicker = this.cycle.cycleNumber;
    }
  }

  getMatches() {
    console.log('getting matching from ui')
    if (!this.cyclePicker || this.cyclePicker === 0) {
      this.cyclePicker = this.cycle.cycleNumber;
    }
    const c = this.share.getCycle(this.cyclePicker)
    return this.share.getMatches().filter(m => c.matches.includes(m.id))
  }

  cycleCount() {
    let list = []
    for (let i = 1; i <= this.cycle.cycleNumber + 3; i++) {
      list.push(i)
    }
    return list
  }

  submit() {
    const user = this.share.getUser()
    // post picksForm to service
    this.picksForm.picks.forEach(pick => {
      pick.userId = user?.username
      this.share.saveAwsObject('/picks', )
    })
  }

  clear() {
    this.picksForm.picks = []
    for (let i = 0; i < 10; i++) {
      this.picksForm.picks.push({
        gameId: this.getMatches()[i].id,
        team: '--',
        points: 0,
        disable: false
      })
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

  switchCycle() {
    console.log('Switching to',this.cyclePicker)
    this.router.navigate(['/picks', this.cyclePicker])
  }
}

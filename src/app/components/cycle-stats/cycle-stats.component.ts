import { Component, OnInit } from '@angular/core';
import { BackendService} from "../../services/backend.service";
import {SharedService} from "../../shared/shared.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cycle-stats',
  templateUrl: './cycle-stats.component.html',
  styleUrls: ['./cycle-stats.component.css']
})
export class CycleStatsComponent implements OnInit {
  url = '/cycle/'
  cycle: any;
  private loading: boolean;
  private cyclePicker: number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
              private backend: BackendService, private share: SharedService) {
    this.loading = true;
    this.route.params.subscribe(params => this.cyclePicker = params['cycle']?parseInt(params['cycle'], 10):this.cycle.cycleNumber)
    this.share.populateTeams().then(
      ()=>{
        this.share.populateMatches().then(
          ()=> {
            // this.teams = this.share.getTeams()
            this.cycle = this.share.getCurrentCycle()
            this.loading = false;
            // this.setForm();
          }
        )
      }
    );
  }

  ngOnInit(): void {
    //this.cycle = this.backend.getCycles()
    if (this.cyclePicker === 0) {
      this.cyclePicker = this.cycle.cycleNumber;
    }
  }

  cycleCount() {
    let list = []
    for (let i = 1; i <= this.cycle.cycleNumber + 3; i++) {
      list.push(i)
    }
    return list
  }
}

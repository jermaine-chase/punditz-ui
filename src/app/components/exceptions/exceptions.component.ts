import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";
import {ExceptionCombo, ExceptionForm} from "../../shared/forms";
import {CycleDTO} from "../../model/CycleDTO";

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.css']
})
export class ExceptionsComponent implements OnInit {

  cycle: CycleDTO
  cyclePicker = 0;
  loading = false;
  exceptionForm = {} as ExceptionForm;

  constructor(private router: Router, private route: ActivatedRoute, private share: SharedService) {
    this.loading = true;
    this.cycle = this.share.getCurrentCycle()
    this.route.params.subscribe(
      params => this.cyclePicker = params['cycle']?parseInt(params['cycle'], 10):this.cycle.cycleNumber)
  }

  ngOnInit(): void {
    this.setUpForm();
    this.loading = false;
  }

  getMatches() {
    console.log('getting matching from ui')
    if (this.cyclePicker === 0) {
      this.cyclePicker = this.cycle.cycleNumber;
    }
    return this.share.getMatches().filter(m => m.matchday === this.cyclePicker)
  }

  switchCycle() {
    console.log('Switching to',this.cyclePicker)
    this.router.navigate(['/exceptions', this.cyclePicker])
  }

  cycleCount() {
    let list = []
    for (let i = 1; i <= this.cycle.cycleNumber + 3; i++) {
      list.push(i)
    }
    return list
  }

  private setUpForm() {
    this.exceptionForm = {
      exceptions: []
    }

    this.getMatches().forEach((m,i)=>{
      let e: ExceptionCombo = {
        gameId: m.id,
        exception: false,
        homeTla: m.homeTeam.tla!!,
        awayTla: m.awayTeam.tla!!,
        gameDate: m.localDate,
        exceptionTimestamp: undefined
      }
      this.exceptionForm.exceptions.push(e)
    })

  }
}

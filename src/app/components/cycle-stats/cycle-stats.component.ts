import { Component, OnInit } from '@angular/core';
import { BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-cycle-stats',
  templateUrl: './cycle-stats.component.html',
  styleUrls: ['./cycle-stats.component.css']
})
export class CycleStatsComponent implements OnInit {
  url = '/cycle/'
  cycle: any;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.cycle = this.backend.getCycles()
  }

  cycleCount() {
    let list = []
    for (let i = 1; i <= this.cycle.cycleNumber + 3; i++) {
      list.push(i)
    }
    return list
  }
}

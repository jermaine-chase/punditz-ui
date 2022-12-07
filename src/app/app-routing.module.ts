import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PicksComponent } from './components/picks/picks.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { ExceptionsComponent } from './components/exceptions/exceptions.component';
import { CycleStatsComponent } from './components/cycle-stats/cycle-stats.component';
import { QuarterStatsComponent } from './components/quarter-stats/quarter-stats.component';
import { RulesComponent } from './components/rules/rules.component';
import { AdminComponent } from './components/admin/admin.component';
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  {path: 'main', component: DashboardComponent},
  {path: 'picks/:cycleNumber', component: PicksComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'cycle-stats/:cycleNumber', component: CycleStatsComponent},
  {path: 'quarter-stats', component: QuarterStatsComponent},
  {path: 'exceptions/:cycleNumber', component: ExceptionsComponent},
  {path: 'predictions', component: PredictionsComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
]


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AppRoutingModule { }

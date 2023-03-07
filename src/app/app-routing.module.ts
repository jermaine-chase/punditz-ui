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
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserComponent} from "./components/user/user.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: DashboardComponent},
  {path: 'picks/:cycle', component: PicksComponent},
  {path: 'picks', component: PicksComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'cycle-stats/:cycle', component: CycleStatsComponent},
  {path: 'cycle-stats', component: CycleStatsComponent},
  {path: 'quarter-stats', component: QuarterStatsComponent},
  {path: 'exceptions/:cycle', component: ExceptionsComponent},
  {path: 'exceptions', component: ExceptionsComponent},
  {path: 'predictions', component: PredictionsComponent},
  {path: 'users', component: UserComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
]


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AppRoutingModule { }

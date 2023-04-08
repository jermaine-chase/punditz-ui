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
import {AuthGuard} from "./services/auth.guard";
import {AdminGuard} from "./services/admin.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'picks/:cycle', component: PicksComponent, canActivate: [AuthGuard]},
  {path: 'picks', component: PicksComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'rules', component: RulesComponent},
  {path: 'cycle-stats/:cycle', component: CycleStatsComponent, canActivate: [AuthGuard]},
  {path: 'cycle-stats', component: CycleStatsComponent, canActivate: [AuthGuard]},
  {path: 'quarter-stats', component: QuarterStatsComponent, canActivate: [AuthGuard]},
  {path: 'exceptions/:cycle', component: ExceptionsComponent, canActivate: [AdminGuard]},
  {path: 'exceptions', component: ExceptionsComponent, canActivate: [AdminGuard]},
  {path: 'predictions', component: PredictionsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserComponent, canActivate: [AdminGuard]},
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

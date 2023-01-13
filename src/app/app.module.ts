import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PicksComponent } from './components/picks/picks.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { ExceptionsComponent } from './components/exceptions/exceptions.component';
import { CycleStatsComponent } from './components/cycle-stats/cycle-stats.component';
import { QuarterStatsComponent } from './components/quarter-stats/quarter-stats.component';
import { RulesComponent } from './components/rules/rules.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PicksComponent,
    PredictionsComponent,
    ExceptionsComponent,
    CycleStatsComponent,
    QuarterStatsComponent,
    RulesComponent,
    AdminComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLinkWithHref,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

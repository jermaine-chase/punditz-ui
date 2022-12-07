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
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";

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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLinkWithHref,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

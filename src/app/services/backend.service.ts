import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Location } from '@angular/common'
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import {MatchDTO} from "../model/MatchDTO"

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  teams = []
  matches = []
  constructor(private http: HttpClient, private location: Location) { }

  get(url: string, apiv2Call?: boolean) {
    if (apiv2Call) {
      const headers = new HttpHeaders()
        .set(environment.auth_token_key, environment.auth_token_val)
        .set('Access-Control-Allow-Origin', '*')
      headers.has(environment.auth_token_key)
      return this.http.get(url, {headers})
    }
    return this.http.get(url)
  }

  post(url: string, obj: any) {
    return this.http.post(url, obj)
  }

  put(url: string, obj: any) {
    return this.http.put(url, obj)
  }

  getSeason(leagueId: string) {
    if (!leagueId) {
      throw Error('League Id is required!');
    }
    let url = 'http://localhost:4200/epl/teams';
    return this.get(url, true);
  }

  getMatches(leagueId: string) {
    if (!leagueId) {
      throw Error('League Id is required!');
    }
    let url = 'http://localhost:4200/epl/matches';
    return this.get(url, true)
  }

  getTeams(leagueId: string) {
    if (!leagueId) {
      throw Error('League Id is required!');
    }
    let url = 'http://localhost:4200/epl/teams';
    return this.get(url, true);
  }
}

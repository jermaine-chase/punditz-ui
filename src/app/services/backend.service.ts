import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {TeamResponseDTO} from "../model/TeamResponseInterface";
import {MatchResponseDTO} from "../model/MatchResponseInterface";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': environment.auth_token_val
      })
    };
    this.httpOptions.headers.has('X-Auth-Token')
  }

  private httpOptions: {
    headers: HttpHeaders
  }

  async getTeams(leagueId: number) {
    let url = environment.eplteams
    if (leagueId === 2018) {
      url = environment.euroteams
    }
    return await lastValueFrom(this.http.get<TeamResponseDTO>(url, this.httpOptions));
  }

  async getMatches(leagueId: number) {
    let url = environment.eplmatches
    if (leagueId === 2018) {
      url = environment.euromatches
    }
    return await lastValueFrom(this.http.get<MatchResponseDTO>(url, this.httpOptions));
  }

  async getCycles() {
    let url = environment.cycleUrl
    return await lastValueFrom(this.http.get<MatchResponseDTO>(url));
  }

}

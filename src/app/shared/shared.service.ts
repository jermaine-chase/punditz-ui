import { Injectable } from '@angular/core';
import {MatchDTO, TeamDTO} from "../model/MatchResponseInterface";
import {BackendService} from "../services/backend.service";
import {IUser} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  getTeamsMap(): Map<number, TeamDTO> {
    return this.teamsMap;
  }
  private teams : TeamDTO[] = [];
  private matches: MatchDTO[] = [];
  private teamsMap = new Map<number, TeamDTO>();
  private token: string = '';
  constructor(private backend: BackendService) {
    this.populateTeams()
    this.populateMatches()
  }
  retrieveTeams() {
    return this.backend.getTeams(2021)
  }

  getTeams() {
    return this.teams
  }

  setTeams(teams: TeamDTO[]) {
    this.teams = teams
  }

  getMatches() {
    return this.matches
  }

  retrieveMatches() {
    return this.backend.getMatches(2021)
  }

  async populateMatches() {
    if (this.matches?.length > 0) {
      console.log('matches already populated')
      return
    }
    let data = await this.retrieveMatches()
    for (let match of data.matches!) {
        let ht = match.homeTeam
        let at = match.awayTeam
        match.localDate = new Date(match.utcDate).toLocaleString();
        ht.tla = this.teamsMap.get(ht.id)?.tla
        at.tla = this.teamsMap.get(at.id)?.tla
    }
    this.setMatches(data.matches!)
  }

  async populateTeams() {
    if (this.teams?.length > 0) {
      console.log('teams already populated')
      return
    }
    let data = await this.retrieveTeams()
    this.setTeams(data.teams!);
    this.teamsMap = new Map<number, TeamDTO>(data.teams!.map((obj: TeamDTO) => [obj.id, obj]))
  }

  setMatches(matches: MatchDTO[] ) {
    this.matches = matches
  }
  getToken() {
    return this.token
  }

  setToken(token: string) {
    this.token = token
  }

  populateUser(result: any): IUser {
    let user = {} as IUser;
    user.email = result.attributes.email;
    user.showPassword = false;
    user.admin = 'Y' === result.attributes['custom:admin'];
    user.firstName = result.attributes['custom:firstName'];
    user.firstName = result.attributes['custom:lastName'];

    return user;
  }
}

import { Injectable } from '@angular/core';
import {MatchDTO, TeamDTO} from "../model/MatchResponseInterface";
import {BackendService} from "../services/backend.service";
import {IUser} from "../services/auth.service";
import {CycleDTO} from "../model/CycleDTO";
import {AwsService} from "../services/aws.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private loadingTeams = false
  private loadingMatches = false
  private teams : TeamDTO[] = [];
  private matches: MatchDTO[] = [];
  private cycles: CycleDTO[] = []
  private currentCycle = 0
  teamsMap = new Map<number, TeamDTO>();
  matchesMap = new Map<number, MatchDTO>();
  private user: IUser | undefined;
  constructor(private backend: BackendService, private awsService: AwsService) {
    this.populateTeams().then(()=> {
      console.log("SharedService::constructor() - Teams Loaded")
      this.loadingTeams = false;
    })
    this.populateMatches().then(()=>{
      console.log("SharedService::constructor() - Matches Loaded")
      this.loadingMatches = false
      this.populateCycles().then(()=>console.log("SharedService::constructor() - Cycles Loaded"))
    })

  }
  retrieveTeams() {
    return this.backend.getTeams(2021)
  }

  getTeams() {
    return this.teams
  }

  setTeams(teams: TeamDTO[]) {
    this.teams = teams
    localStorage.setItem('teams', JSON.stringify(teams))
  }

  getMatches() {
    if (this.matches?.length == 0) {
      this.populateTeams().then(()=>console.log("SharedService::getMatches() - Teams Loaded"))
      this.populateMatches().then(()=>console.log("SharedService::getMatches() - Matches Loaded"))
    }
    return this.matches
  }

  retrieveMatches() {
    return this.backend.getMatches(2021)
  }

  async populateMatches() {
    if (this.loadingMatches) {
      console.log('matches load in progress')
      return
    }
    this.loadingMatches = true
    if (this.matches?.length > 0) {
      console.log('matches already populated')
      return
    }
    const m = localStorage.getItem('matches')
    if (m) {
      this.matches = JSON.parse(m)
    } else {
      let data = await this.retrieveMatches()
      for (let match of data.matches!) {
        let ht = match.homeTeam
        let at = match.awayTeam
        match.localDate = new Date(match.utcDate).toLocaleString();
        ht.tla = this.teamsMap.get(ht.id)?.tla
        at.tla = this.teamsMap.get(at.id)?.tla
        if (!this.currentCycle || this.currentCycle === 0) {
          this.currentCycle = match.season.currentMatchday
        }
      }
      this.setMatches(data.matches!)
      this.matchesMap = new Map<number, MatchDTO>(this.matches.map((obj: MatchDTO) => [obj.id, obj]))
    }
  }

  async populateTeams() {
    if (this.loadingTeams) {
      console.log('teams load in progress')
      return
    }
    this.loadingTeams = true
    if (this.teams?.length > 0) {
      console.log('teams already populated')
      return
    }
    const t = localStorage.getItem('teams')
    if (t) {
      this.teams = JSON.parse(t)
    } else {
      let data = await this.retrieveTeams()
      this.setTeams(data.teams!);
    }
    this.teamsMap = new Map<number, TeamDTO>(this.teams.map((obj: TeamDTO) => [obj.id, obj]))
  }

  async populateCycles() {
    if (this.cycles?.length > 0) {
      console.log('cycles already populated')
      return
    }
    const c = localStorage.getItem('cycles')
    if (c) {
      this.cycles = JSON.parse(c)
      return
    } else {
      for (let m of this.getMatches()) {
        const start = new Date(m.utcDate)
        const end = new Date(m.utcDate)
        let c: CycleDTO = {
          cycleNumber: m.matchday,
          matches: [m.id],
          start: start,
          end: end
        }
        // found already, so add match, update start and end for cycle
        if (this.cycles[m.matchday]) {
          c = this.cycles[m.matchday]
          c.matches.push(m.id)
          if (c.start > start) c.start = start
          if (c.end < end) c.end = end
          // not found, add
        } else {
          this.cycles[m.matchday] = c
        }
      }
      localStorage.setItem('cycles', JSON.stringify(this.cycles))
    }
  }

  getCurrentCycle() {
    return this.getCycle(this.currentCycle)
  }

  getCycle(cycleNumber: number) {
    if (this.cycles?.length === 0) {
      this.populateCycles();
    }
    const matchingCycles = this.cycles.filter(c=>c.cycleNumber === cycleNumber)
    // assumption: there can be only one!
    return matchingCycles.pop()!!
  }

  setMatches(matches: MatchDTO[] ) {
    this.matches = matches
    localStorage.setItem('matches', JSON.stringify(matches))
  }
  getUser() {
    return this.user
  }

  setUser(user: IUser) {
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
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

  parseAwsResponse(response: any): any[] {
    let r: any[] = []
    if (response?.Count > 0) {
      r = response.Items
    } else if (response?.Attributes) {
      r.push(response.Attributes)
    }
    return r
  }

  async getAwsObjects(type: string, cycle: string): Promise<any[]> {
    let rawResponse = await this.awsService.getFromDb('/' + type + '/' + cycle)
    return this.parseAwsResponse(rawResponse)
  }

  async saveAwsObject(type: string, object: any) {
    let rawResponse = await this.awsService.saveToDb('/' + type, object)
    return this.parseAwsResponse(rawResponse)
  }
}

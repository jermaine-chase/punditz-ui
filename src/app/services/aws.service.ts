import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";
import {MatchResponseDTO} from "../model/MatchResponseInterface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private http: HttpClient) { }
  async getFromDb(path: string) {
    let url = environment.dbUrl + path.startsWith('/') ? path : '/' + path;
    return await lastValueFrom(this.http.get<any>(url));
  }

  async saveToDb(path: string, object: any) {
    let url = environment.dbUrl + path.startsWith('/') ? path : '/' + path;
    return await lastValueFrom(this.http.post(url, object))
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  
  private baseUrl: string = environment.api;
  constructor(private _httpClient:HttpClient) { 

  }

  getTeams():Observable<any>{
    const baseurl = `${this.baseUrl}teams/list`
    return this._httpClient.get(baseurl)
  }


  saveTeams(data):Observable<any>{
    const baseurl = `${this.baseUrl}teams/create`
    return this._httpClient.post(baseurl,data)
  }


  updateTeams(data):Observable<any>{
    const baseurl = `${this.baseUrl}teams/update`
    return this._httpClient.post(baseurl,data)
  }

  deleteTeams(data):Observable<any>{
    const baseurl = `${this.baseUrl}teams/delete`
    return this._httpClient.delete(baseurl,{params:data})
  }

}

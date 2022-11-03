import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  baseUrl = environment.api

  constructor(private _httpClient:HttpClient) { }


  getUsers():Observable<any>{
    const baseurl = `${this.baseUrl}users/list`
    return this._httpClient.get(baseurl)
  }

  getTeams():Observable<any>{
    const baseurl = `${this.baseUrl}teams/list`
    return this._httpClient.get(baseurl)
  }

  getRolesAsTeam(data):Observable<any>{
    const baseurl =`${this.baseUrl}teams/team_mapped_role`
    return this._httpClient.get(baseurl,{params:data})
  }

  createUser(data):Observable<any>{
    const baseurl = `${this.baseUrl}users/create`
    return this._httpClient.post(baseurl,data)
  }

  updateUser(data):Observable<any>{
    const baseurl = `${this.baseUrl}users/update`
    return this._httpClient.post(baseurl,data)
  }


  deleteUser(data):Observable<any>{
    const baseurl =`${this.baseUrl}users/delete`
    return this._httpClient.delete(baseurl ,{params:data})
  }
}

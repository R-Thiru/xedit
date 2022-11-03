import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl: string = environment.api;
  constructor(private _httpClient:HttpClient) { }


  getRoles():Observable<any>{
    const baseurl =`${this.baseUrl}roles/list`
    return this._httpClient.get(baseurl)
  }


  saveRoles(data):Observable<any>{
    const baserurl =`${this.baseUrl}roles/create`
    return this._httpClient.post(baserurl,data)
  }

  updateRoles(data):Observable<any>{
    const baserurl =`${this.baseUrl}roles/update`
    return this._httpClient.post(baserurl,data)
  }


  deleteRoles(data):Observable<any>{
    const baseurl = `${this.baseUrl}roles/delete`
    return this._httpClient.delete(baseurl,{params:data})
  }

}

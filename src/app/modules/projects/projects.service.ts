import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectSelected = new BehaviorSubject('')
  baseUrl = environment.api
  constructor(private _httpClient:HttpClient) { }


  getProject():Observable<any>{
    const baseurl = `${this.baseUrl}projects/list`
    return this._httpClient.get(baseurl)
  }


  saveProject(data):Observable<any>{
    const baseurl = "https://33333.cke-cs.com/easyimage/upload/"
    return this._httpClient.post(baseurl, data)
  }

  updateProject(data):Observable<any>{
    const baseurl =`${this.baseUrl}projects/update`
    return this._httpClient.post(baseurl,data)
  }
}

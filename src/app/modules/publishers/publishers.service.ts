import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  baseUrl = environment.api
  constructor(private _httpClient:HttpClient) { 
    
  }


  getPublisher():Observable<any>{
    const baseurl = `${this.baseUrl}publishers/list`
    return this._httpClient.get(baseurl)
  }


  createPublisher(data):Observable<any>{
    const baseurl =`${this.baseUrl}publishers/create`
    return this._httpClient.post(baseurl,data)
  }

  getCountries():Observable<any>{
    const baseurl =`${this.baseUrl}countries`
    return this._httpClient.get(baseurl)
  }

  updatePublisher(data):Observable<any>{
    const baseurl =`${this.baseUrl}publishers/update`
    return this._httpClient.post(baseurl,data)
  }

  deletePublisher(data):Observable<any>{
    const baseurl =`${this.baseUrl}publishers/delete`
    return this._httpClient.delete(baseurl,{params:data})
  }

}

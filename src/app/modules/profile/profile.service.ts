import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userData :any = new BehaviorSubject('')
  private baseUrl = environment.api

  constructor(private _httpClient:HttpClient) { }


  // get login user profile 
  getUserProfile():Observable<any>{
    const baseurl = `${this.baseUrl}/users/user_profile`
    return this._httpClient.get(baseurl)
  }


  // get languages
  getLanguage():Observable<any>{
    const baseurl = `${this.baseUrl}/language/list`
    return this._httpClient.get(baseurl)
  }


  // Change Passsowrd
  updatePassword(data):Observable<any>{
    const baseurl =`${this.baseUrl}/users/change_password`
    return this._httpClient.post(baseurl,data)
  }
}

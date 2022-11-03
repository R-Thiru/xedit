import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuMapService {
  private baseUrl: string = environment.api;
  constructor(private _httpClient:HttpClient) { }



  getMenuList():Observable<any>{
    const baseurl =`${this.baseUrl}menus/menu_list`
    return this._httpClient.get(baseurl)
  }


  getMappedMenuList(data):Observable<any>{
    const baseurl =`${this.baseUrl}menus/mapped_menu`
    return this._httpClient.get(baseurl,{params:data})
  }


  saveMenuMap(data):Observable<any>{
    const baserurl = `${this.baseUrl}menus/menu_mapping`
    return this._httpClient.post(baserurl,data)
  }
}


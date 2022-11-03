import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModernService {

  constructor(private _httpClient:HttpClient) { }

  getEditor():Observable<any>{
    const base_url = `${'assets/editor.json'}`
    return this._httpClient.get(base_url)
  }

  
}

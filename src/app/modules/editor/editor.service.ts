import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
  
  constructor( private http: HttpClient ) { }
  
  // COMMENT MODAL
  commentData:any = new BehaviorSubject('');

  // TABLE MODAL
  tableInsert:any = new BehaviorSubject('');

  getRefTypes():Observable<any>{
    return this.http.get('assets/reftypes.json')
  }


   
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private _pagination: BehaviorSubject<null> = new BehaviorSubject(null);
  constructor() { 
    
  }

  get pagination$(): Observable<any>
  {
      return this._pagination.asObservable();
  }

}

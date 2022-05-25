import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { teamList, teamMapList, teamsMap, teamsMapping } from './component/teamMapping/teamMapping.model';

@Injectable({
  providedIn: 'root'
})
export class StagesService {
 
  constructor() { }

  public label$ = new Subject()

  public tags$ = new Subject()

  // public newTag:BehaviorSubject<teamsMap[] | null> = new BehaviorSubject(teamsMapping)

  // get notes$(){
  //   return this.newTag.asObservable()
  // }
 
  // getnotes$(){
  //   return this.newTag.asObservable()
  // }
}

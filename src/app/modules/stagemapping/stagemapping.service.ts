import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StagemappingService {
  projectSelected: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }
}

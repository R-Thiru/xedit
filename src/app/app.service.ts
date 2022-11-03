import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AppService {

    private userLoggedIn = new Subject<boolean>();
    private modals: any[] = [];
  
    constructor() {
      this.userLoggedIn.next(false);
    }
  
    setUserLoggedIn(userLoggedIn: boolean) {
      this.userLoggedIn.next(userLoggedIn);
    }
  
    getUserLoggedIn(): Observable<boolean> {
      return this.userLoggedIn.asObservable();
    }

    searchData = new BehaviorSubject<any>('')

    menuChanges = new BehaviorSubject<any>('')
    
    //INSERT IMAGE  
    passImageURL: BehaviorSubject<any> = new BehaviorSubject<any>('');
    
    // close(id: string) {
    //   // close modal specified by id
    //   const modal = this.modals.find(x => x.id === id);
    //   modal.close();
    // }

  }
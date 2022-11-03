import { Component, HostListener, OnInit } from '@angular/core';
import { Idle } from '@ng-idle/core';
import {  Router } from '@angular/router';
import { Subject,filter } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    userActivity;
    userInactive: Subject<any> = new Subject();
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    /**
     * Constructor
     */
    constructor(
        private _idle: Idle,
        private _router: Router,
        private _transLocoService:TranslocoService
      
    ) {

        
    
        // const url = window.location.href
        // this._appService.getSite(url).subscribe(res => {
        //     console.log(res)
        // })
       
        // this._idle.setIdle(environment.idleTime);
        // this._idle.setTimeout(environment.idleTimeout);
        // this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        // this._idle.onIdleEnd.subscribe(() => { 
        //     this.idleState = 'No longer idle.'
        //     console.log(this.idleState);
        //     this.reset();
        //   });
        // this._idle.onTimeout.subscribe(() => {
        //     this.idleState = 'Timed out!';
        //     this.timedOut = true;
        //     console.log(this.idleState);
        //     console.log("Locked");
        //     this._router.navigate(['/unlock-session']);
        // });
        // this._idle.onIdleStart.subscribe(() => {
        //     this.idleState = 'You\'ve gone idle!'
        //     console.log(this.idleState);
        //     console.log("Lock screen");
        // });
        // this._idle.onTimeoutWarning.subscribe((countdown) => {
        //     this.idleState = 'You will time out in ' + countdown + ' seconds!'
        //     console.log(this.idleState);
        // });
        // this._keepalive.interval(15);

        // this._keepalive.onPing.subscribe(() => this.lastPing = new Date());
        // this._appService.getUserLoggedIn().subscribe(userLoggedIn => {
        //     console.log(userLoggedIn);
        //     if (userLoggedIn) {
        //         this._idle.watch()
        //     this.timedOut = false;
        //     } else {
        //         this._idle.stop();
        //     }
        // });
        // this.reset();
    }

    ngOnInit(): void {
        // this._appService.routerUrl.next(this._router.url)
        this.setTimeout();
        this._transLocoService.setActiveLang(localStorage.getItem('lang'))
        
        this.userInactive.subscribe(res =>{
            if(res == "Times-Up"){
                this._router.navigateByUrl('unlock-session')
            }
        });
    }

    reset() {
        this._idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
        
        
    }

    setTimeout() {
        this.userActivity = setTimeout(() => this.userInactive.next('Times-Up'), 600000);
    }


    @HostListener('window:mousemove') refreshUserState() {
        clearTimeout(this.userActivity);
        this.setTimeout();
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        clearTimeout(this.userActivity);
        this.setTimeout();
    }
}

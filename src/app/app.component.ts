import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { AppService } from './app.service'
import { environment } from '../environments/environment';
@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    /**
     * Constructor
     */
    constructor(
        private _idle: Idle, 
        private _keepalive: Keepalive,
        private _router: Router,
        private _appService:AppService
    )
    {
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

    reset() {
        this._idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
      }
}

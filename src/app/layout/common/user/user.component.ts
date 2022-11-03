import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { ProfileService } from 'app/modules/profile/profile.service';
import { TranslocoService } from '@ngneat/transloco';
import { AppService } from 'app/app.service';
import { MenuMapService } from 'app/modules/menu-map/menu-map.service';
import { LayoutService } from 'app/layout/layout.service';


export const user =
{
    user_uuid: '',
    first_name: '',
    last_name: '',
    user_name: '',
    user_type: '',
    language: '',
    language_uuid: '',
    last_login: '',
    image: '',
    member_form: '',
    is_editable:'',
    role_uuid: '',
    role_display_name:'', 
    team_uuid: '',
    team_display_name: '',
}
@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: any = user;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _transLocoService: TranslocoService,
        private _profileServcie : ProfileService,
        private _menuMapService : MenuMapService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _layoutService : LayoutService,
        private _router: Router,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to user changes
        // this._userService.user$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((user: User) => {
        //         this.user = user;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
        this._profileServcie.getUserProfile().subscribe(res =>{
            if(res.status){
                this.user = res.data
                localStorage.setItem('lang',this.user.language_code)
                this._transLocoService.setActiveLang(this.user.language_code)
                this._changeDetectorRef.detectChanges()
            }
        },
        (error)=>{

        },
        ()=>{
            let req ={
                team_uuid : this.user.team_uuid,
                role_uuid : this.user.role_uuid
            }
            this._menuMapService.getMappedMenuList(req).subscribe(res =>{
                if(res.status){
                    this._layoutService.accessControlData.next(res.data)
                    
                }
                
            })
        })

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    // updateUserStatus(status: string): void
    // {
    //     // Return if user is not available
    //     if ( !this.user )
    //     {
    //         return;
    //     }

    //     // Update the user
    //     this._userService.update({
    //         ...this.user,
    //         status
    //     }).subscribe();
    // }

    /**
     * Sign out
     */
    signOut(): void
    {
        this._router.navigate(['/sign-out']);
    }
}

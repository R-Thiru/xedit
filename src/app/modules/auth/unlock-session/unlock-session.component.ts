import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { FuseAlertType } from '@fuse/components/alert';
import { AppService } from 'app/app.service';
import { ProfileService } from 'app/modules/profile/profile.service';


@Component({
    selector     : 'auth-unlock-session',
    templateUrl  : './unlock-session.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class AuthUnlockSessionComponent implements OnInit
{
    @ViewChild('unlockSessionNgForm') unlockSessionNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    name: string;
    showAlert: boolean = false;
    unlockSessionForm: FormGroup;
    redirectURL: any;
    private _email: string;

    /**
     * Constructor
     */
    constructor(
        private _location: Location,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _profileService : ProfileService,
        private _userService: UserService
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
        // Get the user's name

        this._profileService.getUserProfile().subscribe(res =>{
            let data = res.data
            this.name = data.first_name +' '+ data.last_name
            this._email = data.user_name
            this.unlockSessionForm.get('name').patchValue(this.name)
        })

        // this._userService.user$.subscribe((user) => {
        //     this.name = user.name;
        //     this._email = user.email;
        // });

        // Create the form
        this.unlockSessionForm = this._formBuilder.group({
            name    : [
                {
                    value   : this.name,
                    disabled: true
                }
            ],
            password: ['', Validators.required]
        });

       
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Unlock
     */
    unlock(): void
    {
        // Return if the form is invalid
        if ( this.unlockSessionForm.invalid )
        {
            return;
        }

        // Disable the form
        this.unlockSessionForm.disable();

        // Hide the alert
        this.showAlert = false;

        this._authService.unlockSession({
            username   : this._email ?? '',
            password: this.unlockSessionForm.get('password').value
        }).subscribe(
            () => {

                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ;

                this._location.back()
                // console.log('this.redirectUR',this.redirectURL)
                // Navigate to the redirect url
                // this._router.navigateByUrl());

            },
            (response) => {

                // Re-enable the form
                this.unlockSessionForm.enable();

                // Reset the form
                this.unlockSessionNgForm.resetForm({
                    name: {
                        value   : this.name,
                        disabled: true
                    }
                });

                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Invalid password'
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
}

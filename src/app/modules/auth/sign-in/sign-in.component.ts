import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'app/core/auth/auth.service';
import { TranslocoHttpLoader } from 'app/core/transloco/transloco.http-loader';
import { UserService } from 'app/core/user/user.service';



@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
        private Translate: TranslocoHttpLoader,
        // private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // get Site according to login
        const origin = {origin: window.location.href}
        this._authService.getSite(origin).subscribe((res) => {
            let lang = res.data.lang
            this._translocoService.setActiveLang(lang)
            localStorage.setItem('lang',lang)
            this.Translate.getTranslation(lang)
        })
        
        // Form Validator
        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe((res) => {

            // Set the redirect url.
            // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
            // to the correct page after a successful sign in. This way, that url can be set via
            // routing file and we don't have to touch here.
            // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
            if (res.status) {
               
                
                // Navigate to the redirect url
                // localStorage.setItem('accessToken', res.data.api_token)
                this._authService.accessToken = res.data.api_token;

                this._authService._authenticated = true;

                // this._userService.user = res.data.first_name;

                // this.alert = {
                //     type: 'success',
                //     message: 
                // };


                this._router.navigateByUrl('dashboard/common')
            }

        },
            (error) => {
             
             
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: error.error.message
                };

                // Show the alert
                this.showAlert = true;
                // if(response){
                //     this._router.navigateByUrl('signed-in-redirect')
                // }
            }
        );
    }
}

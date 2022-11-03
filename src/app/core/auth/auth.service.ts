import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    public _authenticated: boolean = false;
    private baseUrl: string = environment.api;
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // Get Site
    getSite(origin): Observable<any> { 
        const baseurl = `${this.baseUrl}sites/get`
        return this._httpClient.get(baseurl,{params:origin}).pipe(
            catchError((error) => {
                if (error.status == "404") {
                    this._router.navigateByUrl('error')
                    return error
                }
            })
        )
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email): Observable<any> {
        const baseurl = `${this.baseUrl}auth/forgotpassword`
        return this._httpClient.post(baseurl, email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { username: string; password: string }): Observable<any> {
  

        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        const baseurl = `${this.baseUrl}auth/login`
        return this._httpClient.post(baseurl,credentials)
        // .pipe(
        //     switchMap((res:any)=>{
        //         this.accessToken = res.data.api_token.accessToken;
        //         this._authenticated = true;
        //         this._userService.user = res.data.first_name;

        //         return of(res);
        //     })
        // )



        // return this._httpClient.post('api/auth/sign-in', credentials).pipe(
        //     switchMap((response: any) => {

        //         // Store the access token in the local storage
        //         this.accessToken = response.accessToken;

        //         // Set the authenticated flag to true
        //         this._authenticated = true;

        //         // Store the user on the user service
        //         this._userService.user = response.user;

        //         // Return a new observable with the response
        //         return of(response);
        //     })
        // );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
    
                // Store the access token in the local storage
                this.accessToken = localStorage.getItem('accessToken');

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                // this._userService.user = response.user;

                // Return true
                return of(true);
         
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { username: string; password: string }): Observable<any> {
        const baseurl = `${this.baseUrl}auth/sleep`
        return this._httpClient.post(baseurl, credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {

        // Check if the user is logged in
        if (this._authenticated) {
           
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
           
            return of(false);
        }

        // Check the access token expire date
        // if (AuthUtils.isTokenExpired(this.accessToken)) {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Menu } from 'app/layout/common/quick-menu/quick-menu.types';

@Injectable({
    providedIn: 'root'
})
export class QuickMenuService
{
    private _menu: BehaviorSubject<Menu> = new BehaviorSubject(null);
    private _menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for menu
     */
    get menu$(): Observable<Menu>
    {
        return this._menu.asObservable();
    }

    /**
     * Getter for menu
     */
    get menus$(): Observable<Menu[]>
    {
        return this._menus.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get menus
     */
    getMenus(): Observable<any>
    {
        return this._httpClient.get<Menu[]>('api/apps/menu/menus').pipe(
            tap((response: Menu[]) => {
                this._menus.next(response);
            })
        );
    }

    /**
     * Get Menu
     *
     * @param id
     */
    getMenuById(id: string): Observable<any>
    {
        return this._httpClient.get<Menu>('api/apps/menu/menu', {params: {id}}).pipe(
            map((menu) => {

                // Update the menu
                this._menu.next(menu);

                // Return the menu
                return menu;
            }),
            switchMap((menu) => {

                if ( !menu )
                {
                    return throwError('Could not found menu with id of ' + id + '!');
                }

                return of(menu);
            })
        );
    }
}

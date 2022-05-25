import { Injectable } from '@angular/core';
import { assign, cloneDeep, omit } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { menus as menusData} from 'app/mock-api/apps/menu/data';

@Injectable({
    providedIn: 'root'
})
export class MenuMockApi
{
    private _menus: any[] = menusData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();

        // Modify the menus array to attach certain data to it
        this._menus = this._menus.map(menu => ({
            ...menu,
        }));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ menus - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/menu/menus')
            .reply(() => {

                // Clone the menus
                const menus = cloneDeep(this._menus);

                // Return the response
                return [200, menus];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ menu - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/menu/menu')
            .reply(({request}) => {

                // Get the menu id
                const id = request.params.get('id');

                // Clone the menu
                const menus = cloneDeep(this._menus);

                // Find the menu we need
                const menu = menus.find(item => item.id === id);

                // Return the response
                return [200, menu];
            });
    }
}

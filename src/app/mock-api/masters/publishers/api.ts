import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { publishers as publishersData } from 'app/mock-api/masters/publishers/data';

@Injectable({
    providedIn: 'root'
})
export class AcademyMockApi
{
    private _publishers: any[] = publishersData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
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
        // @ Categories - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/masters/publishers')
            .reply(() => {

                // Clone the publishers
                const publishers = cloneDeep(this._publishers);

                // Sort the categories alphabetically by title
                publishers.sort((a, b) => a.name.localeCompare(b.name));

                return [200, publishers];
            });
             // -----------------------------------------------------------------------------------------------------
        // @ Publisher - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
        .onGet('api/masters/publisher')
        .reply(({request}) => {

            // Get the menu id
            const id = request.params.get('id');

            // Clone the menu
            const publishers = cloneDeep(this._publishers);

            // Find the publisher we need
            const publisher = publishers.find(item => item.id === id);

            // Return the response
            return [200, publisher];
        });
    }
}

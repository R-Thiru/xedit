import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = []
    selectedPanel: string = 'profile';
    constructor() { }

    ngOnInit(): void {

        // Setup available panels
        this.panels = [
            {
                id: 'profile',
                icon: 'heroicons_outline:user-circle',
                title: 'Profile',
                description: 'Manage your public profile and private information'
            },
            {
                id: 'security',
                icon: 'heroicons_outline:lock-closed',
                title: 'Security',
                description: 'Manage your password and 2-step verification preferences'
            },

            {
                id: 'notifications',
                icon: 'heroicons_outline:bell',
                title: 'Notifications',
                description: 'Manage when you\'ll be notified on which channels'
            },

        ];
    }

    //   Change tab view 
    goToPanel(panel: string): void {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if (this.drawerMode === 'over') {
            this.drawer.close();
        }
    }


    // Change Tab using Id
    getPanelInfo(id: string): any {
        return this.panels.find(panel => panel.id === id);
    }

}

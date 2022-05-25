import { Route } from '@angular/router';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesComponent } from './components/roles/roles.component';

export const rolesRoutes: Route[] = [
    
    {
        path     : '',
        component: RolesListComponent
    },
    {
        path     : 'details',
        component: RolesComponent
    },
];

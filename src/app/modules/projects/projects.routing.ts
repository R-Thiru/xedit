import { Route } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component'
import { ProjectListComponent } from './components/project-list/project-list.component'
export const projectsRoutes: Route[] = [
    
    {
        path     : '',
        component: ProjectListComponent
    },
    {
        path     : 'details',
        component: ProjectsComponent
    },
];

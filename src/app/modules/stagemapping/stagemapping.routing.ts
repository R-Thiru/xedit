import { Route } from '@angular/router';
import { ProcessMapComponent } from './component/process-map/process-map.component';
import { StageMapComponent } from './component/stage-map/stage-map.component';

export const StagemappingRoutes: Route[] = [
      
    {
        path     : '',
        component: StageMapComponent
    },
    {
        path     : 'processmap',
        component: ProcessMapComponent
    },
   
];

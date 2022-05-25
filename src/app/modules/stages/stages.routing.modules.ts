import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessListComponent } from './component/process-list/process-list.component';
import { StagesListComponent } from './component/stages-list/stages-list.component';
import { TeamMappingComponent } from './component/teamMapping/teamMapping.component';



const routes: Routes = [
 
{
  path     : '',
  component: StagesListComponent,
},
{
  path : 'process',
  component : ProcessListComponent
},
{
  path : 'team',
  component : TeamMappingComponent
}


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagesRoutingModule { }

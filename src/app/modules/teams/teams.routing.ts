import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsCreateComponent } from './components/teams-create/teams-create.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

const routes: Routes = [
 
{
  path     : '',
  component: TeamsListComponent
},
{
  path     : 'create',
  component: TeamsCreateComponent
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }

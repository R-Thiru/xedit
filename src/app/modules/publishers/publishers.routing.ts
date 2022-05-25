import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { PublisherCreateComponent } from './components/publisher-create/publisher-create.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
const routes: Routes = [{
  path     : '',
  pathMatch : 'full', redirectTo: 'publisher/list'
},
{
  path     : 'list',
  component: PublisherListComponent
},
{
  path     : 'create',
  component: PublisherCreateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishersRoutingModule { }

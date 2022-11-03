import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmakeListComponent } from './component/bookmake-list/bookmake-list.component';

const routes: Routes = [
  { path:'',
    component:BookmakeListComponent
  },
  {
    path:'bookmaking',
    component:BookmakeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmakingRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonDashboardComponent } from 'app/modules/dashboard/components/common-dashboard/common-dashboard.component';
import { UsageDashboardComponent } from 'app/modules/dashboard/components/usage-dashboard/usage-dashboard.component';
import { DashboardResolver } from 'app/modules/dashboard/dashboard.resolvers';
const routes: Routes = [

  {
    path     : 'common',
    component: CommonDashboardComponent,
    resolve  : {
      data: DashboardResolver
    }
  },
  {
    path     : 'analytics',
    component: UsageDashboardComponent,
    resolve  : {
      data: DashboardResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

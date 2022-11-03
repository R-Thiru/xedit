import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserComponent } from './component/user/user.component';
import { FuseCardModule } from '@fuse/components/card';
import { TranslocoModule } from '@ngneat/transloco';
import { MaterialModule } from 'app/shared/material.modules';
import { SharedModule } from 'app/shared/shared.module';
import { TeamsRoutingModule } from '../teams/teams.routing';
import { RouterModule, Routes } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { PipeModule } from 'app/shared/pipes/pipes.module';

const routes:Routes = [
  {
    path:'',
    component:UserListComponent
  },
  {
    path:'user',
    component:UserComponent
  }
]

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TranslocoModule,
    FuseCardModule,
    FuseAlertModule,
    PipeModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }

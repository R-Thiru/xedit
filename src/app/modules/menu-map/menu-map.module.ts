import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusPermissionComponent } from './component/menus-permission/menus-permission.component';
import {  Route, RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { TranslocoModule } from '@ngneat/transloco';
import { MaterialModule } from 'app/shared/material.modules';
import { PipeModule } from 'app/shared/pipes/pipes.module';
import { SharedModule } from 'app/shared/shared.module';
import { FuseAlertModule } from '@fuse/components/alert';


const routes:Route[] = [
  {
    path:'',
    component:MenusPermissionComponent
  }
]

@NgModule({
  declarations: [
    MenusPermissionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    TranslocoModule,
    FuseCardModule,
    FuseAlertModule,
    PipeModule,
    RouterModule.forChild(routes)
  ]
})
export class MenuMapModule { }

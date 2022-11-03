import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatuploadComponent } from './components/patupload/patupload.component';
import { UploadComponent } from './components/upload/upload.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.modules';
import { TranslocoModule } from '@ngneat/transloco';
import { PipeModule } from 'app/shared/pipes/pipes.module';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';

const route:Route[]=[
  {
    path:'',
    component:PatuploadComponent
  }
]


@NgModule({
  declarations: [
    PatuploadComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule,
    MaterialModule,
    TranslocoModule,
    PipeModule,
    FuseCardModule,
    FuseAlertModule,
  ]
})
export class PatuploadModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessMapComponent } from './component/process-map/process-map.component';
import { StageMapComponent } from './component/stage-map/stage-map.component';
import { RouterModule } from '@angular/router';
import { StagemappingRoutes } from './stagemapping.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.modules';
import { PipeModule } from 'app/shared/pipes/pipes.module';
import { TranslocoModule } from '@ngneat/transloco';
import { FuseCardModule } from '@fuse/components/card';



@NgModule({
  declarations: [
    ProcessMapComponent,
    StageMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StagemappingRoutes),
    SharedModule,
    MaterialModule,
    TranslocoModule,
    FuseCardModule,
    PipeModule,
  
  ]
})
export class StagemappingModule { }

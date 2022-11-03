import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams.routing';
import { TeamsCreateComponent } from './components/teams-create/teams-create.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component'
import { MaterialModule } from 'app/shared/material.modules';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { PipeModule } from 'app/shared/pipes/pipes.module';
@NgModule({
  declarations: [
    TeamsCreateComponent,
    TeamsListComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TranslocoModule,
    TeamsRoutingModule,
    FuseCardModule,
    FuseAlertModule,
    PipeModule,
  ],
  exports: [
    TeamsCreateComponent,
    TeamsListComponent
  ]
})
export class TeamsModule { }

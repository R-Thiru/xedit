import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { PublishersRoutingModule } from './publishers.routing';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { PublisherCreateComponent } from './components/publisher-create/publisher-create.component';
import { MaterialModule } from 'app/shared/material.modules';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { PipeModule } from 'app/shared/pipes/pipes.module';
import { FuseAlertModule } from '@fuse/components/alert';



@NgModule({
  declarations: [
    PublisherListComponent,
    PublisherCreateComponent,
    

  ],
  imports: [
    PublishersRoutingModule,
    CommonModule,
    MaterialModule,
    FuseCardModule,
    TranslocoModule,
    SharedModule,
    PipeModule,
    FuseAlertModule
    
  ],
  exports: [
    PublisherCreateComponent
  ]
})
export class PublishersModule { }

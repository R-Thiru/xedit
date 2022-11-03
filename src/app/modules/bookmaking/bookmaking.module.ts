import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmakeListComponent } from './component/bookmake-list/bookmake-list.component';
import { BookmakeComponent } from './component/bookmake/bookmake.component';
import { RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { TranslocoModule } from '@ngneat/transloco';
import { MaterialModule } from 'app/shared/material.modules';
import { PipeModule } from 'app/shared/pipes/pipes.module';
import { SharedModule } from 'app/shared/shared.module';
import { BookmakingRoutingModule } from './bookmaking-routing.module';



@NgModule({
  declarations: [
    BookmakeListComponent,
    BookmakeComponent
  ],
  imports: [
    CommonModule,
    BookmakingRoutingModule,
    SharedModule,
    MaterialModule,
    TranslocoModule,
    FuseCardModule,
    PipeModule,
  ]
})
export class BookmakingModule { }

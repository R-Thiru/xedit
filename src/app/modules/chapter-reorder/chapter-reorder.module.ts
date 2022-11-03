import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.modules';
import { TranslocoModule } from '@ngneat/transloco';
import { ChapterReorderComponent } from './component/chapter-reorder.component';


const routes:Routes=[
  {
    path:'',
    component:ChapterReorderComponent
  }
]


@NgModule({
  declarations: [
    ChapterReorderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule,
    TranslocoModule
  ]
})
export class ChapterReorderModule { }

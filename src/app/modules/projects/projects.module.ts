import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'app/shared/shared.module';
import {projectsRoutes } from './projects.routing';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MaterialModule } from 'app/shared/material.modules';
import { TranslocoModule } from '@ngneat/transloco';
import { PipeModule } from 'app/shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectsComponent
  ],
  imports: [
    RouterModule.forChild(projectsRoutes),
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    TranslocoModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatSlideToggleModule,
    FuseAlertModule,
    FuseCardModule,
    PipeModule,
    MatMenuModule,
    SharedModule,
    MaterialModule
  ],
  exports:[
    // ProjectListComponent,
    ProjectsComponent
  ]
})
export class ProjectsModule { }

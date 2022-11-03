import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorWrapperComponent } from './components/editor-wrapper/editor-wrapper.component';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.modules';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorHtmlComponent } from './components/editor-html/editor-html.component';
import { EditorPdfComponent } from './components/editor-pdf/editor-pdf.component';
import { EditorHomeComponent } from './components/Menu/editor-home/editor-home.component';
import { EditorInsertComponent } from './components/Menu/editor-insert/editor-insert.component';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { InsertImageComponent } from './components/Menu/editor-insert/insert-image/insert-image.component';
import { InsertMultiimageComponent } from './components/Menu/editor-insert/insert-multiimage/insert-multiimage.component';
import { InsertTableComponent } from './components/Menu/editor-insert/insert-table/insert-table.component';
import { InsertReferenceComponent } from './components/Menu/editor-insert/insert-reference/insert-reference.component';
import { InsertCommentComponent } from './components/Menu/editor-insert/insert-comment/insert-comment.component';
import { InsertAuthQueryComponent } from './components/Menu/editor-insert/insert-auth_query/insert-auth_query.component';
import { InsertCitationlinkComponent } from './components/Menu/editor-insert/insert-citationlink/insert-citationlink.component';
import { InsertGlossaryComponent } from './components/Menu/editor-insert/insert-glossary/insert-glossary.component';


const route : Route[] = [
  {
    path:'id',
    component:EditorWrapperComponent
  }
]

@NgModule({
  declarations: [
    EditorWrapperComponent,
    EditorHtmlComponent,
    EditorPdfComponent,
    EditorHomeComponent,
    EditorInsertComponent,
    InsertImageComponent,
    InsertMultiimageComponent,
    InsertTableComponent,
    InsertReferenceComponent,
    InsertCommentComponent,
    InsertAuthQueryComponent,
    InsertCitationlinkComponent,
    InsertGlossaryComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule,
    HttpClientModule,
    FuseScrollbarModule,
    RouterModule.forChild(route),
    MaterialModule,
    // MatContenteditableModule,
    // MatCkeditorModule,
    CKEditorModule,
    RouterModule,
    DragDropModule
  ],
  exports:[
    EditorWrapperComponent,
  ]
})
export class EditorModule { }

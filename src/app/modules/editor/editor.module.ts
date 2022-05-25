import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { EditorRoutingModule } from './editor.routing';
import { EditorWrapperComponent } from './components/editor-wrapper/editor-wrapper.component';
import { EditorHtmlComponent } from './components/editor-html/editor-html.component';
import { EditorPdfComponent } from './components/editor-pdf/editor-pdf.component';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    EditorWrapperComponent,
    EditorHtmlComponent,
    EditorPdfComponent
  ],
  imports: [
    CommonModule, 
    EditorRoutingModule,    
    FormsModule,
    MatGridListModule,
    CKEditorModule,
  ]
})
export class EditorModule { }

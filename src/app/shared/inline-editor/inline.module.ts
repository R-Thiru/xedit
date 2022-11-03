import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineComponent } from './inline.component';
import { EditorModule } from 'app/modules/editor/editor.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




@NgModule({
  declarations: [
    InlineComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule
  ],
  exports:[
    InlineComponent
  ]
})
export class InlineEditorModule { }

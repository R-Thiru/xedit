import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { MaterialModule } from './material.modules';
import { InlineEditorModule } from './inline-editor/inline.module';





@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        // InlineEditorModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationComponent
    ],
    declarations: [
      PaginationComponent,
      
      
    ]
})
export class SharedModule
{
}

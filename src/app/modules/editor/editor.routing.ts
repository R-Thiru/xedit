import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorWrapperComponent } from './components/editor-wrapper/editor-wrapper.component';

const routes: Routes = [
  {
    path     : ':id',
    component: EditorWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }

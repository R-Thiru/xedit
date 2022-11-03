import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import customEditor from 'assets/super_build/ckeditor.js';

import customEditor from 'assets/super_build/build/ckeditor';

@Component({
  selector: 'insert-authquery',
  templateUrl: './insert-auth_query.component.html',
  styleUrls: ['./insert-auth_query.component.scss']
})
export class InsertAuthQueryComponent implements OnInit {

  public Editor = customEditor;
  queryForm:FormGroup
  constructor(private _builder:FormBuilder) { }

  ngOnInit(): void {
    this.queryForm = this._builder.group({
      queryEditor:[''],
      verticalSpace:[''],
      horizontalSpace:[''],
      roles:[''],
      teams:[''],
      users:['']
    })
  }

  editorReady(editor){

  }

}

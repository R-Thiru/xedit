import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import customEditor from 'assets/build_def/build/ckeditor';
import customEditor from 'assets/super_build/build/ckeditor';

@Component({
  selector: 'insert-glossary',
  templateUrl: './insert-glossary.component.html',
  styleUrls: ['./insert-glossary.component.scss']
})
export class InsertGlossaryComponent implements OnInit {
  glossaryForm:FormGroup
  Editor= customEditor.Editor
  constructor(private _builder:FormBuilder) { }

  ngOnInit(): void {

    this.glossaryForm = this._builder.group({
      glossary:['New',Validators.required],
      glossaryType:['',Validators.required],
      linkText:[''],
      definition:[''],
      selectChapter:[''],
      selectLink:[''],
      selectEnd:['']
    })
  }


  editorReady(editor){

  }


  submitGlos(){
    console.log(this.glossaryForm.get('glossary').value); 
  }

}

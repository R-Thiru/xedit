import { Component, OnInit } from '@angular/core';
import inlineEditor from 'assets/build/inline-build/ckeditor'
@Component({
  selector: 'inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss']
})
export class InlineComponent implements OnInit {

  constructor() { }
  
  public Editor = inlineEditor;

  ngOnInit(): void {
  }

  editorReady(editor) {
    
  }

}

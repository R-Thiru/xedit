import { ChangeDetectionStrategy,Component, OnInit,ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
  // encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations   : fuseAnimations

})
export class EditorWrapperComponent implements OnInit {
  // public splitEditorView = localStorage.getItem("editorSplit");
  public editorHtml : boolean = true;
  public editorPdf : boolean = true;
  public hide = false;

  constructor( 
    ) { }

  ngOnInit(): void {
  }

  // Split Editor View 
  close(event) {
    if(event == 'html') {
      this.editorHtml = true;
      this.editorPdf = false
    }
    else if('pdf') {
      this.editorPdf = true;
      this.editorHtml = false
    }
    
  }

}

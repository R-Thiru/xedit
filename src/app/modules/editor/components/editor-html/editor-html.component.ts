import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import { AppService } from 'app/app.service';
import { ProjectsService } from 'app/modules/projects/projects.service';
import customEditor from 'assets/super_build/build/ckeditor';
import { EditorService } from '../../editor.service';


@Component({
  selector: 'editor-html',
  templateUrl: './editor-html.component.html',
  styleUrls: ['./editor-html.component.scss'],
  // encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditorHtmlComponent implements OnInit {
  @ViewChild("myEditor") myEditor: any;
  public editor = customEditor.Editor;
  public Config = {
    placeholder: "Type the content here!"
  };



  constructor(private _detecter: ChangeDetectorRef,
    private _appService: AppService,
    private _editorService: EditorService) { }

  ngOnInit() { }

  imageUpload(res) {
    const docFrag = this.editor.model.change(_currentwriter => {

      //CUSTOM IMAGE PLUGIN
      const imgFigure = _currentwriter.createElement('XImage');
      const image = _currentwriter.createElement('imageUpload', { src: res[0] });
      const label = _currentwriter.createElement('label');
      const figcap = _currentwriter.createElement('figcap');
      const imgTitle = _currentwriter.createElement('imgTitle');
      const sourceFigCap = _currentwriter.createElement('sourceFigCap');
      const creditLine = _currentwriter.createElement('creditLine');
      const note = _currentwriter.createElement('note');
      const docFrag = _currentwriter.createDocumentFragment();


      _currentwriter.append(imgFigure, docFrag);
      _currentwriter.append(image, imgFigure);
      _currentwriter.append(label, imgFigure);
      _currentwriter.append(figcap, imgFigure);
      _currentwriter.append(imgTitle, figcap);
      _currentwriter.append(creditLine, figcap);
      _currentwriter.append(sourceFigCap, figcap);
      _currentwriter.append(note, figcap);

      _currentwriter.insertText(res[1].label, label)
      _currentwriter.insertText(res[1].title, imgTitle)
      _currentwriter.insertText(res[1].caption, figcap)
      _currentwriter.insertText(res[1].credit_line, creditLine)
      _currentwriter.insertText(res[1].source_line, sourceFigCap)
      _currentwriter.insertText(res[1].note, note)
      this._detecter.detectChanges()

      return docFrag;

    });
    return docFrag

  }
  onReady(editor) {
    this.editor = editor

    editor.setData('Test Data here');

    // INSERT COMMENT
    this._editorService.commentData.subscribe(res => {
      const docFrag = editor.model.change(writer => {
      const xcom = writer.createElement('customComment');
      const docFrag = writer.createDocumentFragment();

      writer.append(xcom, docFrag);
      writer.insertText('jhdfgkjh', xcom)

      return docFrag;
      });
      editor.model.insertContent(docFrag, editor.model.document.selection);
    });

    // INSERT IMAGE
    this._appService.passImageURL.subscribe(res => {
      
      if (res) {
        const docFrag = this.imageUpload(res);
        editor.model.insertContent(docFrag, editor.model.document.selection);
      }
    });


    // INSERT TABLE
    this._editorService.tableInsert.subscribe(res => {
      const docFrag = editor.model.change(writer => {

        const figure = writer.createElement('xtablefig');
        const table = writer.createElement('xtable');
        const thead = writer.createElement('xthead');
        const tbody = writer.createElement('xtbody');
        const tr1 = writer.createElement('xtr');
        const tr2 = writer.createElement('xtr');
        const th = writer.createElement('xth');
        const td = writer.createElement('xtd');
        const span = writer.createElement('xtablespan');
        const docFrag = writer.createDocumentFragment();

        writer.append(figure, docFrag);
        writer.append(table, figure);
        writer.append(tbody, table);
        writer.append(thead, table);
        writer.append(tr1, thead);
        writer.append(th, tr1);
        writer.append(tr2, tbody);
        writer.append(td, tr2);
        writer.append(span, td);

        writer.insertText(' Hear about this made-up disorder but it actually', th);
        writer.insertText(' Even the studies that were conducted almost ', span);
      })
    });



    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement(),
      );
  }

  onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log('OnChange data', data);
  }

}

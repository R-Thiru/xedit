import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from 'app/modules/editor/editor.service';
import customEditor from 'assets/super_build/build/ckeditor';




@Component({
  selector: 'insert-reference',
  templateUrl: './insert-reference.component.html',
  styleUrls: ['./insert-reference.component.scss']
})
export class InsertReferenceComponent implements OnInit {
  referenceForm: FormGroup
  Editor = customEditor.InlineEditor;
  selectedIndex:any;
  changedValue:any = '';
  referenceTypes = [ ];
  editorConfig = {
    toolbar: ['xeditbold', 'xedititalic', 'xeditsubscript', 'xeditsuperscript']
  };

  constructor(private _builder: FormBuilder,
    private _editorService:EditorService) { }

  ngOnInit(): void {
    this.referenceForm = this._builder.group({
      newGroup: [false],
      newSubGroup: [false],
      groupType: [''],
      groupTitle: [''],
      subGroupTitle: [''],
      refItems: [''],
      refGroup: [''],
      refstyle: [''],
      doi: [''],
      pubmed_Id: [''],
      text: [''],
      tab: this._builder.array([this.init()])
    })

    this.referenceForm.get('tab').valueChanges.subscribe(res =>{
      debugger
      this.changedValue = res
    })

    this.getReferenceTypes()

  }


  init() {
    return this._builder.group({
      reftype: ['', [Validators.required]],
      collabTitle: [''],
      author_et_al: [''],
      editor_et_al: [''],
      translator_et_al: [''],
      authors: this._builder.array([this.authorsInit()]),
      editors: this._builder.array([this.authorsInit()]),
      translators: this._builder.array([this.authorsInit()]),
      article: [''],
      source: [''],
      year:[''],
      volume:[''],
      issue:[''],
      f_page:[''],
      l_page:[''],
      comment:[''],
      doi:[''],
      uri:[''],
      email:[''],
      season:[''],
      month:[''],
      day:[''],
      series:[''],
      edition:[''],
      publisherName:[''],
      publisherLocation:[''],
      conferenceName:[''],
      conferenceLocation:[''],
      conferenceDate:[''],
      conferenceSponser:[''],
      partTitle:['']
    })
  }

  getIndexStepper(index){
    this.selectedIndex = index.selectedIndex
   
    
    
  }

  // onChange({ editor }: ChangeEvent) {
  //   const data = editor.getData();
  //   let a = document.getElementsByClassName('edit')
  //   console.log(a);
  // }

  editorReady(editor) {

  }

  focus(editor) {
    editor.editor.ui.getEditableElement().parentElement.insertBefore(
      editor.editor.ui.view.panel.element,
      editor.editor.ui.getEditableElement()
    );

  }




  authorsInit() {
    return this._builder.group({
      surname: ['', Validators.required],
      givenName: [''],
      prefix: [''],
      suffix: [''],
    })
  }


  getTab(form) {
    return form.controls.tab.controls
  }

  getauthors(form) {
    return form.controls.authors.controls
  }

  geteditors(form) {
    return form.controls.editors.controls
  }

  getTranslators(form) {
    return form.controls.translators.controls
  }

  addItem() {
    const control = <FormArray>this.referenceForm.get('tab');
    control.push(this.init());

  }

  clearItem(index) {
    const control = <FormArray>this.referenceForm.get('tab')
    control.length > 1 ? control.removeAt(index) : null

  }

  addAuthorsItem(i, arrayName) {
    const control = <FormArray>this.referenceForm.get('tab')
    let a = control.at(i).get(arrayName) as FormArray
    a.push(this.authorsInit())
  }

  clearAuthorsItem(index, j, arrayName) {
    const control = <FormArray>this.referenceForm.get('tab')
    let a = control.at(index).get(arrayName) as FormArray
    a.length > 1 ? a.removeAt(j) : null
  }


  refSubmit() {
   console.log(this.referenceForm.value);
   
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

  }


  getReferenceTypes(){
    this._editorService.getRefTypes().subscribe(res =>{
      this.referenceTypes = res
    })
  }
}

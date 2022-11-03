import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'editor-insert',
  templateUrl: './editor-insert.component.html',
  styleUrls: ['./editor-insert.component.scss']
})
export class EditorInsertComponent implements OnInit {
  selectedMenu:any
  gridView:boolean = true;
  insertFormGroup:FormGroup;
  damFrom:FormGroup;
  multiPart:boolean = false;

  constructor( public dialogRef: MatDialogRef<EditorInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.selectedMenu = this.data
    // console.log(this.selectedMenu)

  }



  

}

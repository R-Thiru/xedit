import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditorService } from 'app/modules/editor/editor.service';
import { rowContent } from './insert-table.model';

@Component({
  selector: 'insert-table',
  templateUrl: './insert-table.component.html',
  styleUrls: ['./insert-table.component.scss']
})
export class InsertTableComponent implements OnInit {
  insertTable:FormGroup
  tableForm:FormGroup
  rowContent = rowContent

  constructor(private _builder:FormBuilder,  private _editorService:EditorService) { }

  ngOnInit(): void {

    this.tableForm = this._builder.group({
      rows:[''],
      cols:[''],
      header:[''],
      caption:[''],
      credit_line:[''],
      source_line:[''],
      note:['']
    })

  }


// Hover Value in table
  getCol(row, col) {
    if(row == col){
      this.hoverLayer(row);
    }
    else {
      this.colHoverLayer(row, col)
    }
    
  }

  // Select Value Through Hover in Table
  hoverLayer(index) {
    this.rowContent.forEach((x,i)=>{
        if(i <= index){
          x.row.forEach((y,j)=>{
            if(index >= j){
              y.isChecked = false
            }
          })
        }
    })
   
  }

  // Select Value Through Hover in Table
  colHoverLayer(index, temp){
    this.rowContent.forEach((x,i)=>{
      if(i <= index){
        x.row.forEach((y, j)=>{
          if(j <= temp){
            y.isChecked = false
          }
        })
      }
    })
  }


  // To Select row Confirm the row and col Value
  selectedRow(row,col){
    this.rowContent.forEach(x =>{
        x.row.forEach(y =>{
          y.isChecked == false ? y.isSelected = true : y.isSelected = false
        })
    })
    this.tableForm.patchValue({
      rows:row + 1,
      cols:col + 1
    })
    
  }

// DeSelect Value Through Hover In Table
  clearCol(){
    this.rowContent.forEach(x =>{
      x.row.forEach(y =>{
        y.isChecked = true
       
      })
    })
  }


  closeDialog(){
    this.rowContent.forEach(x =>{
      x.row.forEach(y =>{
        y.isChecked = true
        y.isSelected = false
      })
    })
  }

  // Table submit
  submitInsertTable() {
    // console.log(this.insertTable.value.note);
    this._editorService.tableInsert.next( this.insertTable );
  }
}

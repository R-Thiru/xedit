import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  UploadForm: FormGroup
  fileName:any
  selectedFile:any = []
  constructor(private _builder:FormBuilder,
    public dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.fileName = this.data
    this.UploadForm = this._builder.group({
      fileUploading:['']
    })
  }


  openFiles(fileList){
    if (!fileList.files.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/svg+xml', 'application/pdf', 'application/postscript'];

    // Return if the file is not allowed
    if (!allowedTypes.includes(fileList.files[0].type)) {
      return;
    }

    for (let i = 0; i < fileList.files.length; i++) {
      const data = fileList.files[i]
      this.selectedFile.push(data) 
    }
  }


  deleteFileSelected(item) {
    this.selectedFile.forEach((x, i) => {
      if (x.name == item.name) {
        this.selectedFile.splice(i, 1)
      }
    })
  }

  uploadFiles(){

  }

}

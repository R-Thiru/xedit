import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  message: string = ""
  cancelButtonText = "Cancel"
 

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    if (data) {
      console.log('data',data);
      this.message = data.message || this.message;
      console.log('data_m:->',data.message);
      // console.log('dataxdf2',data.buttonText);
      if (data.buttonText) {
        // debugger

        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        // console.log('data2',data.buttonText.cancel);
        // console.log('data2',this.cancelButtonText);
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
   }

  ngOnInit(): void {
  }

}

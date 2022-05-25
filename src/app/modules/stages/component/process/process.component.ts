import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcessListComponent } from '../process-list/process-list.component';


@Component({
  selector: 'process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  processForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, public processList: ProcessListComponent) { }

  ngOnInit(): void {
    // Create the contact form
    this.processForm = this._formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      defaultorder: ['', [Validators.required]],

    });
  }
  close() {
    this.processList.matDrawer.close()
    this.processList.paginationToggle = true
  }

}

import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StagesListComponent } from '../stages-list/stages-list.component';


@Component({
  selector: 'stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StagesComponent implements OnInit {
  stagesForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, public stagesList: StagesListComponent) { }

  ngOnInit(): void {
    // Create the contact form
    this.stagesForm = this._formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      defaultorder: ['', [Validators.required]],

    });
  }
  close() {
    this.stagesList.matDrawer.close()
    this.stagesList.paginationToggle = true
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamsListComponent } from '../teams-list/teams-list.component';


@Component({
  selector: 'teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss']
})
export class TeamsCreateComponent implements OnInit {

  teamForm: FormGroup;
  constructor(  private _formBuilder: FormBuilder,public teamList:TeamsListComponent) { }
  
  ngOnInit(): void {
      // Create the contact form
      this.teamForm = this._formBuilder.group({
        id          : [''],
        name        : ['', [Validators.required]],
       
    });
  }
  close(){
    this.teamList.matDrawer.close()
    this.teamList.paginationToggle = true
  }


}

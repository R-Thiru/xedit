import { ChangeDetectionStrategy,Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesListComponent } from '../roles-list/roles-list.component';


@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class RolesComponent implements OnInit {
  rolesForm: FormGroup;
  constructor(  private _formBuilder: FormBuilder,public RolesList:RolesListComponent) { }
  
  ngOnInit(): void {
      // Create the contact form
      this.rolesForm = this._formBuilder.group({
        id          : [''],
       
        name        : ['', [Validators.required]],
        description      : ['', [Validators.required]],
       
    });
  }
  close(){
    this.RolesList.matDrawer.close()
    this.RolesList.paginationToggle = true
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  constructor(private _formBuilder: FormBuilder, public RolesList: RolesListComponent,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    this.rolesForm = this._formBuilder.group({
      uuid: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });

  }



  close() {
    this.RolesList.matDrawer.close()
    this.rolesForm.reset()
  }


  patchValue(data) {
    this.rolesForm.patchValue({
      uuid: data.uuid,
      name: data.display_name,
      description: data.description,
      image: data.image
    })

  }


  saveRoles() {
    let value = {
      uuid: this.rolesForm.get('uuid').value,
      name: this.rolesForm.get('name').value,
      description: this.rolesForm.get('description').value,
      image: this.rolesForm.get('image').value
    }

    value.uuid ? this.RolesList.updateRoleData(value) : this.RolesList.saveRoleData(value)
    this.RolesList.matDrawer.close()
    this.rolesForm.reset()
  }


  deleteImage(){
    this.rolesForm.get('image').setValue('')
  }


  uploadAvatar(fileList) {
    // Return if canceled
    if (!fileList.length) {
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];


    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    this._readAsDataURL(file).then((data) => {
      let k = this.rolesForm.get('name').value
      this.RolesList.roleData.forEach(x => {
        if(x.name == k ){
          x.image = data
        }
        
      })
      // this.teamImage = data
      this.rolesForm.get('image').setValue(data)
      this._changeDetectorRef.detectChanges()
    });
  }



  private _readAsDataURL(file: File): Promise<any> {

    // Return a new promise
    return new Promise((resolve, reject) => {

      // Create a new reader
      const reader = new FileReader();

      // Resolve the promise on success
      reader.onload = (): void => {
        resolve(reader.result);
      };

      // Reject the promise on error
      reader.onerror = (e): void => {
        reject(e);

      };

      // Read the file as the
      reader.readAsDataURL(file);
    });
  }


}

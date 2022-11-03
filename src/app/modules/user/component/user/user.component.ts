import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { userTypes } from '../../user.model';
import { UserService } from '../../user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  userTypes = userTypes
  userImage: any;
  pswrdLen: any;
  teamList = []
  roleList = []

  @ViewChild('userNgForm') userNgForm: NgForm;

  constructor(private _formBuilder: FormBuilder,
    private userList: UserListComponent,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    // user initialation
    this.userForm = this._formBuilder.group({
      uuid: [''],
      first_Name: ['', Validators.required],
      last_Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      user_type: ['', Validators.required],
      team: ['', Validators.required],
      role: ['', Validators.required],
      image: [''],
      isEdit: ['']
    })


    // password length
    this.userForm.get('password').valueChanges.subscribe(res => {
      let x = res
      if (x) {
        this.pswrdLen = x.length
      }

    })

  }


  // Close Mat-Drawer
  close() {
    this.userList.matDrawer.close()
    this.userNgForm.resetForm()
  }

  // Save and update in User Screen 
  save() {
    let req = {
      
      first_name: this.userForm.get('first_Name').value,
      last_name: this.userForm.get('last_Name').value,
      password: this.userForm.get('password').value,
      role_uuid: this.userForm.get('role').value,
      team_uuid: this.userForm.get('team').value,
      user_name: this.userForm.get('email').value,
      user_type: this.userForm.get('user_type').value,
      user_uuid: this.userForm.get('uuid').value,
      image: this.userForm.get('image').value,
      is_editable: this.userForm.get('isEdit').value
    }
    console.log(req);
    req.user_uuid ? this.userList.updateUserData(req) : this.userList.createUserData(req)

  }

  // PatchValue For Edit
  patchValue(user) {
    this.userForm.patchValue({
      first_Name: user.first_name,
      last_Name: user.last_name,
      email: user.user_name,
      user_type: user.user_type,
      team: user.team_uuid,
      role: user.role_uuid,
      image: user.image,
      isEdit: user.is_editable,
      uuid: user.user_uuid,
    })

  }


  // Upload Image
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

      let k = this.userForm.get('uuid').value
      this.userList.userArr.forEach(x => {

        if (x.user_uuid == k) {
          x.image = data
          this.userForm.get('image').setValue(data)
        }
        else {
          this.userForm.get('image').setValue(data)
        }


      })
      // this.teamImage = data


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

  // Get Team For DropDown
  getTeam() {
    this._userService.getTeams().subscribe(res => {
      if (res.status) {
        this.teamList = res.data
        this.teamList = this.teamList.filter(x => x.display_name != 'Admin')
        this.userForm.get('team').value ? this.getRoleData(this.userForm.get('team').value) : null
      }
    })
  }


  // Using Selected DropDown Role Loaded
  getRoleData(team) {
    let req = {
      team_uuid: team
    }
    this._userService.getRolesAsTeam(req).subscribe(res => {
      if (res.status) {
        this.roleList = res.data
      }
    })
  }



  // Image Delete
  deleteImage() {
    this.userForm.get('image').setValue('')
  }

}

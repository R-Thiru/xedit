import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AppService } from 'app/app.service';
import { Observable } from 'rxjs';

import { UserService } from '../../user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: fuseAnimations
})
export class UserListComponent implements OnInit {

  userArr = []
  inputData: any
  gridView: boolean = true
  showAlert: boolean = false
  configForm: FormGroup
  paginationData: any
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  @ViewChild('matDrawer') public matDrawer: MatDrawer
  @ViewChild(UserComponent) user

  constructor(private _userService: UserService,
    private _service: AppService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

    this._service.searchData.subscribe((res: any) => {
      this.inputData = res.toLowerCase()
      this._changeDetectorRef.detectChanges()
    })
    // Initial the dataSource value 
    this.obs = this.dataSource.connect();
    //Get All users data
    this.getUsersData()
    //Intial Dialouge Alert
    this.deletePopup()

  }

  // ADD user
  addUser() {
    this.user.getTeam()
    this.user.userNgForm.resetForm()
    this.matDrawer.open()
  }



  // Edit user
  editUser(user) {
    this.user.getTeam()
    this.user.patchValue(user)
    this.user.userForm.get('password').clearValidators()
    this.user.userForm.get('password').updateValueAndValidity()
    this.matDrawer.open()
  }

  // Get Data Form Database through Service
  getUsersData() {
    this._userService.getUsers().subscribe(res => {
      if (res.status) {
        this.userArr = res.data
       
        this.dataSource = new MatTableDataSource(this.userArr)
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginationData
      }
    })
  }


  // pagination change file data
  getData(data) {
    this.paginationData = data
    this.dataSource.paginator = this.paginationData
    this.obs = this.dataSource.connect();
  }

  // changeView of grid & table
  selectedTabValue(event) {
    event.tab.textLabel == 'Grid' ? this.gridView = true : this.gridView = false
  }


  // Create User and Store to Database
  createUserData(req) {
    this._userService.createUser(req).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.alert = {
          message: 'User Added Sucessfully',
          type: 'success'
        }
        this.getUsersData()
        this.matDrawer.close()
        this.user.userForm.get('password').setValidators([Validators.required,Validators.minLength(6)])
        this.user.userForm.get('password').updateValueAndValidity()
        
      }
    },
      (error) => {
        this.showAlert = true
        this.alert = {
          message: error.error.message,
          type: 'error'
        }
        this.matDrawer.close()
      })

  }

  // Update User In database
  updateUserData(data) {
    this._userService.updateUser(data).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.alert = {
          message: 'User Updated Successfully',
          type: 'success'
        }
        this.getUsersData()
        this.user.userNgForm.resetForm()
        this.matDrawer.close()
        
        this.user.userForm.get('password').setValidators([Validators.required,Validators.minLength(6)])
        this.user.userForm.get('password').updateValueAndValidity()
        
      }
    },
      (error) => {
        this.showAlert = true
        this.alert = {
          message: error.error.message,
          type: 'error'
        }
        this.matDrawer.close()
      })
  }



  // Output from alert component
  output(item) {
    this.showAlert = !item
  }



  // Delete User
  openConfirmationDialog(data): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {


      // Delete Team From DataBase
      if (result == 'confirmed') {
        let req = {
          uuid: data.user_uuid
        }
        this._userService.deleteUser(req).subscribe(res => {
          if (res.status) {
            this.showAlert = true
            this.alert = {
              message: 'User Deleted SuccessFully',
              type: 'success'
            }
            this.getUsersData()
          }
        },
        )

      }
    });
  }


  // confirmation dialouge with for delete
  deletePopup() {
    this.configForm = this._formBuilder.group({
      title: 'Delete User',
      message: 'Are you sure you want to Delete this User permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Remove',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'Cancel'
        })
      }),
      dismissible: true
    });
  }
}

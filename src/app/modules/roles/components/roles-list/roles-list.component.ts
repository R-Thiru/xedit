import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AppService } from 'app/app.service';
import { LayoutService } from 'app/layout/layout.service';
import { Observable } from 'rxjs';
import { RolesService } from '../../roles.service';
import { RolesComponent } from '../roles/roles.component';


@Component({
  selector: 'roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  animations: fuseAnimations
})
export class RolesListComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  roleData = []
  inputData: any;
  showAlert: boolean = false
  accessData : any
  gridView: boolean = true;
  paginationData: any
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.roleData);

  @ViewChild('roles') roles: RolesComponent
  @ViewChild('matDrawer') public matDrawer: MatDrawer
  @ViewChild('paginator') paginator: MatPaginator;
  configForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _layoutService: LayoutService,
    private _service: AppService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _roleService: RolesService) { 

      this._layoutService.accessControlData.subscribe(res =>{
        
          res.forEach(x => {
            if(x.name.includes('Role')){
              this.accessData = x.access
            }
          });
        
      })
    }


 

  ngOnInit() {
    
    // search Data
    this._service.searchData.subscribe((res: any) => {
      this.inputData = res.toLowerCase()
      this._changeDetectorRef.detectChanges()
    })

    // Initialize the Obs
    this.obs = this.dataSource.connect()

    // Roles Data getting from API
    this.getRolesData()

    // Custom Form for Dialog 
    this.configForm = this._formBuilder.group({
      title: 'Delete Role',
      message: 'Are you sure you want to Delete this Role permanently? <span class="font-medium">This action cannot be undone!</span>',
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

 
  

  // Open Drawer for create and delete
  createRole(role) {
    role ? this.roles.patchValue(role) : null
    this.matDrawer.open()
  }




  // dialog open for Delete
  openConfirmationDialog(data): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirmed') {
        let req = { uuid: data.uuid }
        this._roleService.deleteRoles(req).subscribe(res => {
          if (res.status) {
            this.showAlert = true
            this.alert = {
              message: res.message,
              type: 'success'
            }
            this.getRolesData()
          }
        }),
          (error) => {
            this.showAlert = true
            this.alert = {
              message: error.message,
              type: 'error'
            }
          }
      }
    });
  }

  // Pagination changes capture
  getData(data) {
    this.paginationData = data
    this.dataSource.paginator = this.paginationData
    this.obs = this.dataSource.connect();
  }

  // Change Tab grid and List
  selectedTabValue(event) {
    event.tab.textLabel == 'Grid' ? this.gridView = true : this.gridView = false
  }

  // get Roles From DataBase
  getRolesData() {
    this._roleService.getRoles().subscribe(res => {
      if (res.status) {
        this.roleData = res.data
        this.dataSource = new MatTableDataSource(this.roleData)
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginationData
      }
    }),
      (error) => {
        console.log(error);
      }
  }


  // Save Roles from database
  saveRoleData(value) {
    this._roleService.saveRoles(value).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.alert = {
          message: res.message,
          type: 'success'
        }
        this.getRolesData()
        this.matDrawer.close()
      }
    }),
      (error) => {
        this.showAlert = true
        this.alert = {
          message: error.message,
          type: 'error'
        }

      }

  }


  // Update Roles from database
  updateRoleData(value) {
    this._roleService.updateRoles(value).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.getRolesData()
        this.alert = {
          message: res.message,
          type: 'success'
        }
      }
    }),
      (error) => {
        this.showAlert = true
        this.alert = {
          message: error.message,
          type: 'error'
        }
      }

  }


  // Getting Data from alert output
  output(alert) {
    this.showAlert = !alert
  }

}

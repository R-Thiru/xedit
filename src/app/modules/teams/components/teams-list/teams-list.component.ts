import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AppService } from 'app/app.service';
import { Observable } from 'rxjs';
import { TeamsService } from '../../teams.service';
import { TeamsCreateComponent } from '../teams-create/teams-create.component';


@Component({
  selector: 'teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  animations: fuseAnimations
})
export class TeamsListComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  configForm: FormGroup
  showAlert: boolean = false
  teamsData = []
  isLoading: boolean = true;
  gridView: boolean = true;
  paginationData: any
  inputData : any
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('teamCreate') teamCreate: TeamsCreateComponent
  @ViewChild('matDrawer') matDrawer: MatDrawer
  @ViewChild('paginator') paginator: MatPaginator;



  constructor(
    private _service : AppService,
    private _changeDetectorRef :ChangeDetectorRef,
    private _teamService: TeamsService,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService) {

  }

  ngOnInit() {

    this._service.searchData.subscribe((res: any) => {
      this.inputData = res.toLowerCase()
      this._changeDetectorRef.detectChanges()
    })
    // Initial the dataSource value 
    this.obs = this.dataSource.connect();

    //Get Team Data 
    this.getTeamData()

    //Intial Dialouge Alert
    this.deletePopup()
  }


  //Update and Add Team
  createTeam(team) {
    team ? this.teamCreate.patchValue(team) : null
    this.matDrawer.open()
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }


  openConfirmationDialog(team): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      
      
      // Delete Team From DataBase
      if (result == 'confirmed') {
        let req = {
          uuid: team.uuid
        }
        this._teamService.deleteTeams(req).subscribe(res => {
          if (res.status) {
            this.showAlert = true
            this.alert = {
              type: 'success',
              message: res.message
            }
            this.getTeamData()
          }
        })

      }
    });
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


  // Get All Data From Database
  getTeamData() {
    this._teamService.getTeams().subscribe(res => {
      if (res.status) {
        this.teamsData = res.data
        this.isLoading = false
        this.dataSource = new MatTableDataSource(this.teamsData)
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginationData
      }
    })
  }


  // Save Data To Database
  saveTeamData(value) {
    
    let req = {
      name: value.name,
      image : value.image
    }
    this._teamService.saveTeams(req).subscribe(res => {
      if (res) {
        this.getTeamData()
        this.showAlert = true
        this.alert = {
          type: 'success',
          message: res.message
        };
      }
    },
      (error) => {
        this.showAlert = true
        this.alert = {
          type: 'error',
          message: error.error.message
        };
      })
  }


  // Update Data To Database
  updateTeamData(value) {

    let req = {
      uuid: value.uuid,
      name: value.name,
      image: value.image
    }
    this._teamService.updateTeams(req).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.getTeamData()
        this.alert = {
          type: 'success',
          message: res.message
        };
      }
    })
  }

  // confirmation dialouge with for delete
  deletePopup() {
    this.configForm = this._formBuilder.group({
      title: 'Delete Team',
      message: 'Are you sure you want to Delete this Team permanently? <span class="font-medium">This action cannot be undone!</span>',
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

  // Output from alert component
  output(item){
    this.showAlert = !item
  }

}

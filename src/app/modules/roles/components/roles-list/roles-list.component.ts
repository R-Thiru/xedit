import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable } from 'rxjs';
import { role, roleData } from './roles.model';

@Component({
  selector: 'roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent implements OnInit {
  public roleData :role[] = roleData
  
  isLoading: boolean = false;
  paginationToggle : boolean = true;
  gridView : boolean = true;
  paginationData :any
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.roleData);
  @ViewChild('matDrawer') public matDrawer: MatDrawer
  @ViewChild('paginator') paginator: MatPaginator;
  configForm: FormGroup;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private _formBuilder: FormBuilder,
              private _fuseConfirmationService: FuseConfirmationService) {

  }

  ngOnInit() {
    this.configForm = this._formBuilder.group({
      title      : 'Delete Publisher',
      message    : 'Are you sure you want to Delete this Publisher permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon       : this._formBuilder.group({
          show : true,
          name : 'heroicons_outline:exclamation',
          color: 'warn'
      }),
      actions    : this._formBuilder.group({
          confirm: this._formBuilder.group({
              show : true,
              label: 'Remove',
              color: 'warn'
          }),
          cancel : this._formBuilder.group({
              show : true,
              label: 'Cancel'
          })
      }),
      dismissible: true
  });
  }



  createPublisher() {
    this.matDrawer.open()
    this.paginationToggle = false
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  openConfirmationDialog(): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  getData(data) {
    this.paginationData = data
    this.dataSource.paginator = this.paginationData
    this.obs = this.dataSource.connect();
  }

  selectedTabValue(event){
  
    event.tab.textLabel == 'Grid' ? this.gridView = true : this.gridView = false 
  }
}

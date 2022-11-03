import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AppService } from 'app/app.service';
import { Observable } from 'rxjs';
import { PublishersService } from '../../publishers.service';
import { PublisherCreateComponent } from '../publisher-create/publisher-create.component';


@Component({
  selector: 'publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss'],
  animations: fuseAnimations
})
export class PublisherListComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  publisherDatas: any = []
  isLoading: boolean = false;
  showAlert: boolean = false;
  gridView: boolean = true;
  paginationData: any
  obs: Observable<any>;
  publisherForm: any;
  inputData: any
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(PublisherCreateComponent) PublisherCreateComponent
  @ViewChild('matDrawer') public matDrawer: MatDrawer
  @ViewChild('paginator') paginator: MatPaginator;

  configForm: FormGroup;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    private _publishService: PublishersService,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public service: AppService) {

  }

  ngOnInit() {

    this.getPublisherData()

    this.service.searchData.subscribe((res: any) => {
      this.inputData = res.toLowerCase()
      this._changeDetectorRef.detectChanges()
    })

    this.configForm = this._formBuilder.group({
      title: 'Delete Publisher',
      message: 'Are you sure you want to Delete this Publisher permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Delete',
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



  addPublisher() {
    this.PublisherCreateComponent.publishersForm.resetForm()
    this.matDrawer.open()
  }

  editPublisher(publisher) {
    this.PublisherCreateComponent.patchValue(publisher)
    this.matDrawer.open()
  }



  openConfirmationDialog(list): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference

    dialogRef.afterClosed().subscribe((result) => {

      if (result === 'confirmed') {
        this.deletePublisherData(list)
        this.dataSource = new MatTableDataSource<any>(this.publisherDatas);
        this.dataSource.paginator = this.paginationData
        this.obs = this.dataSource.connect();
      }

    });
  }

  getData(pagedata) {
    this.paginationData = pagedata
    this.dataSource.paginator = this.paginationData
    this.obs = this.dataSource.connect();
  }

  selectedTabValue(event) {
    event.tab.textLabel == 'Grid' ? this.gridView = true : this.gridView = false
  }


  // get publisher data from database
  getPublisherData() {
    this._publishService.getPublisher().subscribe(res => {
      if (res.status) {
        this.publisherDatas = res.data
        this.dataSource = new MatTableDataSource(this.publisherDatas)
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginationData
      }
    })
  }


  // add publisher
  createPublisherData(data) {
    this._publishService.createPublisher(data).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.alert = {
          message: 'Publisher Added SuccessFully',
          type: 'success'
        }
        this.getPublisherData()
      }
    },
      (error) => {
        this.showAlert = true,
          this.alert = {
            message: error.error.message,
            type: 'error'
          }
      })
  }

  // UpdatePublisher
  updatePublisherData(data) {
    this._publishService.updatePublisher(data).subscribe(res => {
      if (res.status) {
        this.showAlert = true,
          this.alert = {
            message: res.message,
            type: 'success'
          }
        this.getPublisherData()
      }
    },
      (error) => {
        this.showAlert = true,
          this.alert = {
            message: error.error.message,
            type: 'error'
          }
      })
  }

  // deletePublisher
  deletePublisherData(data) {
    let req = {
      uuid: data.uuid
    }
    this._publishService.deletePublisher(req).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.alert = {
          message: 'Deleted SuccessFully',
          type: 'success'
        }
        this.getPublisherData()
      }
    })
  }

  // Output from alert component
  output(item) {
    this.showAlert = !item
  }
}

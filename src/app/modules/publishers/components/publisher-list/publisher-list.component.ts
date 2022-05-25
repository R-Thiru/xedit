import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AppService } from 'app/app.service';
import { Observable } from 'rxjs';
import { PublisherCreateComponent } from '../publisher-create/publisher-create.component';
import { card, cardData } from './publisher.model';

@Component({
  selector: 'publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherListComponent implements OnInit {

  public cardData: card[] = cardData
  isLoading: boolean = false;
  paginationToggle: boolean = true;
  gridView: boolean = true;
  paginationData: any
  obs: Observable<any>;
  publisherForm: any;
  inputData: any
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.cardData);
  @ViewChild(PublisherCreateComponent) PublisherCreateComponent
  @ViewChild('matDrawer') public matDrawer: MatDrawer
  @ViewChild('paginator') paginator: MatPaginator;
  configForm: FormGroup;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public service: AppService) {

  }

  ngOnInit() {

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



  createPublisher(list) {

    this.PublisherCreateComponent.patchValue(list)
    this.matDrawer.open()
    this.paginationToggle = false


  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  openConfirmationDialog(list): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference

    dialogRef.afterClosed().subscribe((result) => {

      if (result === 'confirmed') {
        // alert('Delete SuccessFully')
        let i = this.cardData.findIndex(x => x.uuid == list.uuid)
        this.cardData.splice(i, 1)

        this.dataSource = new MatTableDataSource<any>(this.cardData);
        this.dataSource.paginator = this.paginationData
        this.obs = this.dataSource.connect();
      }

    });
  }

  getData(data) {
    this.paginationData = data
    this.dataSource.paginator = this.paginationData
    this.obs = this.dataSource.connect();
  }

  selectedTabValue(event) {
    event.tab.textLabel == 'Grid' ? this.gridView = true : this.gridView = false
  }
}

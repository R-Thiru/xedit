import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'app/app.service';
import { Observable } from 'rxjs';
import { PatuploadService } from '../../patupload.service';
import { UploadComponent } from '../upload/upload.component';


@Component({
  selector: 'patupload',
  templateUrl: './patupload.component.html',
  styleUrls: ['./patupload.component.scss']
})
export class PatuploadComponent implements OnInit {
  gridView: boolean = true;
  inputData: any;
  journalData: any = []
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.journalData);
  paginationData: any;

  constructor(private _service: AppService,
    private _matDialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
    private _patuploadService: PatuploadService) { }

  ngOnInit(): void {

    // search Data
    this._service.searchData.subscribe((res: any) => {
      this.inputData = res.toLowerCase()
      this._changeDetectorRef.detectChanges()
    })
    // Initialize the Obs
    this.obs = this.dataSource.connect()

    this.getJournalData()


  }


  // Change Tab grid and List
  selectedTabValue(event) {
    event.tab.textLabel == 'Grid' ? this.gridView = true : this.gridView = false
  }

  // Pagination changes capture
  getData(data) {
    this.paginationData = data
    this.dataSource.paginator = this.paginationData
    this.obs = this.dataSource.connect();
  }

  // getJournal List
  getJournalData() {
    this._patuploadService.getJournalList().subscribe(res => {
      this.journalData = res
      this.dataSource = new MatTableDataSource(this.journalData)
      this.obs = this.dataSource.connect();
      this.dataSource.paginator = this.paginationData
    })
  }


  upload(journal){
    let selectedJounal = journal.display_name;
    if (journal.display_name) {
      const dialogRef = this._matDialog.open(UploadComponent, {
        maxHeight:"100vh",
        maxWidth:"100vw",
        data: selectedJounal
      });
    }
  }

}

import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


export interface CustomMetaData {
  filedname: string;
  filedtype: string;
}

const ELEMENT_DATA: CustomMetaData[] = [
  {filedtype: 'text', filedname: 'Author'},

];



@Component({
  selector: 'settings-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaLibraryComponent implements OnInit {
  mediaLibraryForm: FormGroup;

  displayedColumns: string[] = ['filedtype', 'filedname','action'];
  dataSource = [...ELEMENT_DATA];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mediaLibraryForm = this._formBuilder.group({
      checkDuplicate          : ['']

    });
  }

  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

}

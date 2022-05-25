import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize: number;
  pageIndex: number;
  length: number;
  
  pageNumbers: number[];


  @Input() disabled = false;
  @Input() hidePageSize = false;
  @Input() pageSizeOptions: number[];
  @Input() showFirstLastButtons = false;
  @Output() page = new EventEmitter<PageEvent>();
  @Output() pagination = new EventEmitter<any>();
  @Input('pageIndex') set pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
  @Input('length') set lengthChanged(length: number) {
    this.length = length;
   
  }
  @Input('pageSize') set pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
   
  }

  constructor() {}

  ngOnInit() {
  
  }

  ngAfterViewInit (){
    this.pagination.emit(this.paginator);
  }

  paginationChange(pageEvt: PageEvent) {
    this.length = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    
    this.emitPageEvent(pageEvt);

  }

 

  emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
    this.pagination.emit(this.paginator)
  }
  

}

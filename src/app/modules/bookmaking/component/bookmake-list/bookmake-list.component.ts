import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bookArr, chapterArr } from './bookmake-list.model';

@Component({
  selector: 'bookmake-list',
  templateUrl: './bookmake-list.component.html',
  styleUrls: ['./bookmake-list.component.scss']
})
export class BookmakeListComponent implements OnInit {
  bookArr = bookArr
  chapterArr = chapterArr
  selectedBook = null
  dataImage: any
  chapterForm: FormGroup
  checkAll :boolean
  
  constructor(private _builder: FormBuilder) { }

  ngOnInit(): void {
    this.chapterForm = this._builder.group({
      selectAll: [false],
      check: [false],
      radio: [{ value: '', disabled: true }],
      pageStyle: [{ value: '', disabled: true }],
      pageNo: [{ value: '', disabled: true }],
      prefix: [{ value: '', disabled: true }],
      bookName : ['',Validators.required],
      bookType : ['',Validators.required]
    })

    this.chapterForm.get('selectAll').valueChanges.subscribe(res => {
      this.chapterForm.get('check').patchValue(res)

      this.chapterArr.forEach(x => {
        x.is_disable = !x.is_disable
      })

      
    })

    this.chapterForm.get('radio').valueChanges.subscribe(result => {
      result.includes('Start') ? this.chapterForm.get('pageNo').enable() : this.chapterForm.get('pageNo').disable()
    })
  }



  getCheck(data) {
    let a = this.chapterArr.find(x => x.file_uuid == data)
    a.is_disable = !a.is_disable
    a.is_disable ? this.chapterForm.get('prefix').disable() : this.chapterForm.get('prefix').enable()
    this.checkAll = this.chapterArr.every(y => y.is_disable == false)  
    
  }



  toggleDetails(book) {
    if (this.selectedBook && this.selectedBook.id === book.id) {
      // Close the details
      this.selectedBook = null
      return;
    }
    this.selectedBook = book;
  }



  delete() {
    alert('ok')
  }



  openImages(fileList: FileList) {
    // Return if cancelled
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    if (file.type == 'image/jpeg' || file.type == 'image/png') {
      this._readAsDataURL(file).then((data) => {
        this.dataImage = data
        console.log(data);

      });
    }
    else {
      this.dataImage = file.name

    }

  }



  private _readAsDataURL(file: File): Promise<any> {
    console.log(file)
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



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapterArr, event.previousIndex, event.currentIndex);
  }




  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}

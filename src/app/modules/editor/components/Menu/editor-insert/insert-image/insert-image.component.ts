import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';
import { ProjectsService } from 'app/modules/projects/projects.service';


@Component({
  selector: 'insert-image',
  templateUrl: './insert-image.component.html',
  styleUrls: ['./insert-image.component.scss']
})
export class InsertImageComponent implements OnInit {

  insertFormGroup: FormGroup;
  gridView: boolean = true;
  multiPart: boolean = false;
  selectedFile: any = []
  data: any;



  constructor(
    private _ProjectsService:ProjectsService,
    private _appService: AppService,
    private _builder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    this.insertFormGroup = this._builder.group({
      radioImage: ['inline'],
      label: [''],
      title: [''],
      caption: [''],
      title_dam: [''],
      credit_line_dam: [''],
      source_line: [''],
      note: [''],
      source: [''],
      model: [''],
      creator: [''],
      subject: [''],
      contributor: [''],
      publisher: [''],
      credit_line: [''],
      date: [''],
      type: [''],
      format: [''],
      identifier: [''],
      rights: [''],
      keyword: [''],
      pixel: [''],
      location: [''],
      alt_text: [''],
      image_position: [''],
      image_id: [''],
      rating: [''],
      taxonomy: [''],
      license: [''],
      restriction: [''],
      property: [''],
      fpo: [''],
      description: [''],
      img: File,
      imageUP: [''],
      imageUploading: ['']
    })

    this.insertFormGroup.get('radioImage').valueChanges.subscribe(res => {
      res == 'multipart' ? this.multiPart = true : this.multiPart = false
    });
  }

   /*
  * Switching Menu's in popup 
  */
   selectedTabValue(event) {
    event.tab.textLabel == 'IMAGE' ? this.gridView = true : this.gridView = false
  }

  openImages(fileList: any) {
    
    // Return if cancelled
    if (!fileList.files.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/svg+xml', 'application/pdf', 'application/postscript'];

    // Return if the file is not allowed
    if (!allowedTypes.includes(fileList.files[0].type)) {
      return;
    }

   
    let multiImage = []
   
    for (let i = 0; i < fileList.files.length; i++) {
      const data = fileList.files[i]
      this.selectedFile.push(data)     
      const file = fileList.files[i];
      this._readAsDataURL(file).then((data) => {
        multiImage.push(data)
        this.selectedFile.forEach((x, i) => {
          multiImage.forEach((y, j) => {
            if (i == j) {
              x.imageUrl = y
            }
          })
        })
        this._changeDetectorRef.detectChanges()
      });
      
    }
  
    
  }


  private _readAsDataURL(file: File): Promise<any> {

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


  deleteFileSelected(item) {
    this.selectedFile.forEach((x, i) => {
      if (x.name == item.name) {
        this.selectedFile.splice(i, 1)
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.selectedFile, event.previousIndex, event.currentIndex);
    }
  }

  // Submitting Image 
  submitInsertImage() {
    let data =[]
    var img_Data =[];
    this.selectedFile.forEach(x =>{
      data.push(x.imageUrl)
      img_Data.push(data, this.insertFormGroup.value)
    })

    if(this.insertFormGroup.get('radioImage').value == 'inline') {
      this._appService.passImageURL.next(img_Data); 
     
    } else {
      this._appService.passImageURL.next(img_Data); 
    }

    
    
  }
}

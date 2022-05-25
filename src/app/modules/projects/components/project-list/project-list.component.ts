import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { ignoreElements, Observable, Subject } from 'rxjs';
import { ProjectsService } from '../../projects.service';
import { project, projectData } from './project-list.model';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  // animations: [
  //   trigger('flipState', [
  //     state('active', style({
  //       transform: 'rotateY(179deg)'
  //     })),
  //     state('inactive', style({
  //       transform: 'rotateY(0)'
  //     })),
  //     transition('active => inactive', animate('500ms ease-out')),
  //     transition('inactive => active', animate('500ms ease-in'))
  //   ])
  // ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  public projectData: project[] = projectData
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.projectData);
  obs: Observable<any>;
  inputData: any
  constructor(public service: AppService,
    public prjctService : ProjectsService,
    public _router : Router,
    public _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.obs = this.dataSource.connect();
    this.service.searchData.subscribe((res: any) => {
      this.inputData = res.toLowerCase()
      this._changeDetectorRef.detectChanges()
    })
  }

  openImages(fileList: FileList) {
    
    // Return if cancelled
    if (!fileList.length) {
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    this._readAsDataURL(file).then((data) => {
      this.projectData.forEach(x => {
        if (x.id == this.projectId) {
          x.image = data
        }
      })
      this._changeDetectorRef.detectChanges()
    });
  }
  projectId: any
  uploadImages(project): void {
    console.log('checked', project.id)
    this.projectId = project.id
  }
  removeImage(project): void {
    console.log('delete', project.id)
    project.image = null;

    // // Update the note
    // this.noteChanged.next(note);
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


  flipData: any
  toggleFlip(card) {
    
    this.projectData.forEach(x => {
      if (x.id == card) {
        x.toggle = !x.toggle
      }
    })
  }

  viewChapters(project):void{
    this._router.navigateByUrl('/projects/details')
    this.prjctService.projectSelected.next(project)
    
  }

  

}



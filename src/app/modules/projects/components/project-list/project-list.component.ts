import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { PublishersService } from 'app/modules/publishers/publishers.service';
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

  projectData: any[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  obs: Observable<any>;
  inputData: any;
  projectId: any;

  @ViewChild('matDrawer') public matDrawer: MatDrawer

  constructor(public service: AppService,
    public _projectService: ProjectsService,

    public _router: Router,
    public _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProjectData()
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
        if (x.uuid == this.projectId) {
          x.image = data
        }
      })
      this._changeDetectorRef.detectChanges()
    });
  }



  uploadImages(project): void {
    this.projectId = project.uuid
  }

  removeImage(project): void {
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

  viewChapters(project): void {
    this._router.navigateByUrl('/projects/details')
    this._projectService.projectSelected.next(project)

  }

  createProject() {
    this.matDrawer.open()
    
  }

  saveProject(data) {
    
    data.uuid ? this.updateProjectData(data) : this.saveProjectData(data)
  }

  getProjectData() {
    this._projectService.getProject().subscribe(res => {
      if (res.status) {
        this.projectData = res.data
        this.dataSource = new MatTableDataSource(this.projectData)
        this.obs = this.dataSource.connect()
        this._changeDetectorRef.detectChanges()
      }
    },
      (error) => {

      })
  }


  saveProjectData(data) {
    
    let req = data
    this._projectService.saveProject(req).subscribe(res => {
      if (res.status) {
        console.log('save', res);

      }
    },
      (error) => {

      })
  }


  updateProjectData(data) {
    let req = data
    this._projectService.updateProject(req).subscribe(res => {
      if (res.status) {
        console.log('Update', res);

      }
    },
      (error) => {

      })
  }



}

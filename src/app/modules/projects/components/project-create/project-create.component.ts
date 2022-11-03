import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishersService } from 'app/modules/publishers/publishers.service';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  projectForm: FormGroup
  publisherList:any = []

  constructor(private projectList : ProjectListComponent, 
    private _formBuilder : FormBuilder,
    public _publisherService:PublishersService,) { }

  ngOnInit(): void {
    this.getPublisherData()
    this.projectForm = this._formBuilder.group({
      uuid: [''],
      project_type: ['',[Validators.required]],
      project_name: ['',[Validators.required]],
      project_title: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      project_complexity: ['', [Validators.required]],
      workflow: ['',[Validators.required]],
      reference_type: ['',[Validators.required]],
      reference_style: ['', [Validators.required]],
      reference_call: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      due_date: ['', [Validators.required]],
      digital_isbn: ['', [Validators.required]],
      print_isbn: ['', [Validators.required]],
      trim_size: ['', [Validators.required]],
      split_editor : [''],
      issn:[''],
      issue:['']

    });

    
  }


  close() {
    this.projectList.matDrawer.close()
  }


  getPublisherData(){
    this._publisherService.getPublisher().subscribe(res =>{
      if(res.status){
        this.publisherList = res.data
      }
    })
 }


 saveProject(){
    let req = this.projectForm
    this.projectList.saveProject(req)
 }
}

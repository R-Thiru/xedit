import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';

@Component({
  selector: 'notify-tab',
  templateUrl: './notify-tab.component.html',
  styleUrls: ['./notify-tab.component.scss']
})
export class NotifyTabComponent implements OnInit {

  notificationsForm:FormGroup
  constructor(private _builder:FormBuilder,
    private _appService:AppService) { }

  ngOnInit(): void {
    this.notificationsForm = this._builder.group({
      communication : ['',Validators.required],
      editorMenu :['',Validators.required]
    })


    this.notificationsForm.get('editorMenu').valueChanges.subscribe(res => {
        this._appService.menuChanges.next(res)
    })  
  }

}

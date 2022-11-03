import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'insert-citationlink',
  templateUrl: './insert-citationlink.component.html',
  styleUrls: ['./insert-citationlink.component.scss']
})
export class InsertCitationlinkComponent implements OnInit {

  citationForm:FormGroup

  constructor(private _builder:FormBuilder) { }

  ngOnInit(): void {
    this.citationForm = this._builder.group({
      citationType:['',Validators.required],
      selectType:[''],
      enterLabel:[''],
      selectLink:[''],
      selectChapter:['']
    })

    this.citationForm.get('citationType').valueChanges.subscribe(res =>{    
       this.citationForm.get('selectType').reset()
       this.citationForm.get('enterLabel').reset(),
       this.citationForm.get('selectLink').reset(),
       this.citationForm.get('selectChapter').reset()
    })
    
  }
  
  
  submitForm(){
    console.log(this.citationForm.get('citationType').value);

  }

}

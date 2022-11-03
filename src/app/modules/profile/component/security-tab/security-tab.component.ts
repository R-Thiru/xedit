import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { valid } from 'chroma-js';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'security-tab',
  templateUrl: './security-tab.component.html',
  styleUrls: ['./security-tab.component.scss'],
  animations: fuseAnimations
})
export class SecurityTabComponent implements OnInit {


  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert:boolean = false
  securityForm: FormGroup
  userId: any
  matched: boolean = true

  constructor(private _builder: FormBuilder,
    private _profileService: ProfileService) { }

  ngOnInit(): void {
    // Form Group Initiator
    this.securityForm = this._builder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['',[Validators.minLength(6),Validators.required]],
      reEnterPassword: ['', [Validators.minLength(6),Validators.required]],
      askPasswordChange: [false],
      twoStep: [false]
    })

// Get Login User UUID using BehaviourSubject
    this._profileService.userData.subscribe(res => {
      this.userId = res.user_uuid;
    })

  }


// Password Changes
  updatePasswordData() {
    let req = {
      old_password: this.securityForm.get('currentPassword').value,
      password: this.securityForm.get('newPassword').value,
      user_uuid: this.userId
    }
    this._profileService.updatePassword(req).subscribe(res => {
      if (res.status) {
        this.showAlert = true
        this.alert = {
          message:res.message,
          type:'success'
        }
        this.securityForm.reset()
      }
    },
    (error)=>{
      this.showAlert = true
      this.alert = {
        message:'Something Went Wrong',
        type:'error'
      }
      this.securityForm.reset()
    })
  }


  // Save button
  savePassword() {
    this.updatePasswordData()
  }


  // Output from alert component
  output(item) {
    this.showAlert = !item
  }
}


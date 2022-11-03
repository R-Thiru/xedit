import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { TranslocoService } from '@ngneat/transloco';
import { UserService } from 'app/modules/user/user.service';
import { ProfileService } from '../../profile.service';


@Component({
  selector: 'profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
  animations:fuseAnimations
})
export class ProfileTabComponent implements OnInit {
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  selectedLang:any
  showAlert:boolean = false
  profileForm:FormGroup
  userArr :any =[]
  language:any = []

  constructor(private _builder:FormBuilder,
    private _transLocoService:TranslocoService,
    private _userService:UserService,
    private _profileService:ProfileService,
    private _changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    
    
    this.getUserProfileData()
    this.getLanguageData()

    // Profile Form Initialization
    this.profileForm = this._builder.group({
      uuid : [''],
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      team :['',Validators.required],
      role : ['',Validators.required],
      email: ['',Validators.required],
      language : ['',Validators.required],
      languageCode: [''],
      image : [''],
      role_uuid: [''],
      team_uuid: [''],
      editable : [''],
      user_Type : ['']
    })
  }

  

  // Upload Image
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
      this.profileForm.get('image').setValue(data)
      this._changeDetectorRef.detectChanges()
    });
  }


  // Delete Image
  removeImage(){
    this.profileForm.get('image').setValue('')
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




// Profile data from Database
  getUserProfileData(){
    this._profileService.getUserProfile().subscribe(res =>{
      if(res.status){
        this.userArr = res.data
        this._profileService.userData.next(this.userArr)
        this.patchValue(this.userArr)
      }
    })
  }


// Patch Value in Profile Forms
  patchValue(data){
    this.profileForm.patchValue({
      uuid : data.user_uuid,
      firstName : data.first_name,
      lastName : data.last_name,
      team:data.team_display_name,
      role:data.role_display_name,
      email:data.user_name,
      image:data.image,
      language:data.language_uuid,
      languageCode: data.language_code,
      role_uuid : data.role_uuid,
      team_uuid : data.team_uuid,
      editable : data.is_editable,
      user_Type : data.user_type,
    })

  }

  

  // Language form Api
  getLanguageData(){
    this._profileService.getLanguage().subscribe(res =>{
      if(res.status){
        this.language = res.data
      }
    })
  }

  langChanges(lang){
    let a = this.language.find(x => x.uuid == lang)
    this.selectedLang = a.language_code
    localStorage.setItem('lang',this.selectedLang)
  }

  // Update Profile Changes
  updateProfileData(data){
    let req = {
        first_name: data.firstName,
        last_name: data.lastName,
        role_uuid: data.role_uuid,
        team_uuid: data.team_uuid,
        user_name: data.email,
        user_type: data.user_Type,
        user_uuid: data.uuid,
        image: data.image,
        is_editable: data.editable,
        language_uuid:data.language
    }

    this._userService.updateUser(req).subscribe(res =>{
      if(res.status){
        this.showAlert = true
        this.alert = {
          type:'success',
          message:'Profile Updated Successfully'
        }
        this.getUserProfileData()
        this.getLanguageData()
        this._transLocoService.setActiveLang(this.selectedLang)
        this._changeDetectorRef.detectChanges()
      }
    },
    (error)=>{
      this.showAlert = true
        this.alert = {
          type:'error',
          message:'Issue With Profile Updation'
        }
    })
  }


   // Output from alert component
   output(item) {
    this.showAlert = !item
  }

}

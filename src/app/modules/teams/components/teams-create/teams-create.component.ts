import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamsListComponent } from '../teams-list/teams-list.component';


@Component({
  selector: 'teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss']
})
export class TeamsCreateComponent implements OnInit {

  teamForm: FormGroup;

  teamImage: any;

  constructor(private _formBuilder: FormBuilder,
    public teamList: TeamsListComponent,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Create the contact form
    this.teamForm = this._formBuilder.group({
      uuid: [''],
      name: ['', [Validators.required]],
      image: ['']
    });
  }


  close() {
    this.teamList.matDrawer.close()
    this.teamForm.reset()
  }

  uploadAvatar(fileList) {
    // Return if canceled
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
      let k = this.teamForm.get('name').value
      this.teamList.teamsData.forEach(x => {
        if(x.name == k ){
          x.image = data
        }
        
      })
      // this.teamImage = data
      this.teamForm.get('image').setValue(data)
      this._changeDetectorRef.detectChanges()
    });
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



  // let value = {
  //   uuid:this.teamForm.get('uuid'),
  //   name:this.teamForm.get('name'),
  //   image:this.teamForm.get('image')
  // }


  saveTeam() {
    let value = {
      uuid: this.teamForm.get('uuid').value,
      name: this.teamForm.get('name').value,
      image: this.teamForm.get('image').value
    }
   
    
    value.uuid ? this.teamList.updateTeamData(value) : this.teamList.saveTeamData(value)
    
    this.teamList.matDrawer.close()
    this.teamForm.reset()
  }


  patchValue(team){
    this.teamForm.patchValue({
      uuid : team.uuid,
      name: team.display_name,
      image:team.image
    })
    // this.teamImage = this.teamForm.get('image').value
  }


  deleteImage(){
    this.teamForm.get('image').setValue('')
  }

}

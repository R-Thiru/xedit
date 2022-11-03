import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PublishersService } from '../../publishers.service';
import { PublisherListComponent } from '../publisher-list/publisher-list.component';
import { cardData } from '../publisher-list/publisher.model';

@Component({
  selector: 'publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],

})
export class PublisherCreateComponent implements OnInit {
  publisherForm: FormGroup;
  countries: any = [];
  request: any

  @ViewChild('publishersForm') publishersForm: NgForm;
  
  constructor(private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _publisherService: PublishersService,
    public publisherList: PublisherListComponent) { }

  ngOnInit(): void {

    this.getCountriesData()
    // Create the contact form
    this.publisherForm = this._formBuilder.group({
      uuid: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      emails: ['', [Validators.required, Validators.email]],
      phoneNumbers: ['', [Validators.required]],
      country: ['', Validators.required],
      name: ['',Validators.required],
      image: ['']
    

    })


  }

  patchValue(list) {
    this.publisherForm.patchValue({
      uuid:list.uuid,
      image:list.image,
      address1: list.address1,
      address2: list.address2,
      name: list.publisher_name,
      emails: list.email,
      phoneNumbers: list.contact_number,
      country: list.country_uuid
    })
  }

  save() {
    let data = {
      uuid: this.publisherForm.get('uuid').value,
      image: this.publisherForm.get('image').value,
      address1: this.publisherForm.get('address1').value,
      address2: this.publisherForm.get('address2').value,
      contact_number: this.publisherForm.get('phoneNumbers').value,
      country_uuid: this.publisherForm.get('country').value,
      publisher_name: this.publisherForm.get('name').value,
      email: this.publisherForm.get('emails').value,
    }

    this.publisherForm.get('uuid').value ? this.publisherList.updatePublisherData(data) : this.publisherList.createPublisherData(data)
    this.close()

  }

  close() {
    this.publisherList.matDrawer.close()
    this.publishersForm.resetForm()
  }



  getCountriesData() {
    this._publisherService.getCountries().subscribe(res => {
      if (res.status) {
        this.countries = res.data
      }
    })
  }

  // Upload Image
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

      let k = this.publisherForm.get('uuid').value
      this.publisherList.publisherDatas.forEach(x => {
        if (x.user_uuid == k) {
          x.image = data
          this.publisherForm.get('image').setValue(data)
        }
        else {
          this.publisherForm.get('image').setValue(data)
        }


      })
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


  deleteImage() {
    this.publisherForm.get('image').setValue('')
  }

}

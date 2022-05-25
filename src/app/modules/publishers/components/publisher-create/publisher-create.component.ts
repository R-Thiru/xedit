import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublisherListComponent } from '../publisher-list/publisher-list.component';
import { cardData } from '../publisher-list/publisher.model';

@Component({
  selector: 'publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PublisherCreateComponent implements OnInit {
  publisherForm: FormGroup;
  publisherLists = cardData
  request : any
  constructor(private _formBuilder: FormBuilder, public publisherList: PublisherListComponent) { }

  ngOnInit(): void {

    // Create the contact form
    this.publisherForm = this._formBuilder.group({
      id: [''],
      address1: [''],
      address2: [''],
      name: ['', [Validators.required]],
      emails: ['', [Validators.required]],
      phoneNumbers: ['', [Validators.required]],
      country: ['', [Validators.required]]

    });


  }

  patchValue(list) {
    this.publisherForm.patchValue({
      id: list.uuid,
      address1: list.address1,
      address2: list.address2,
      name: list.publisher_name,
      emails: list.email,
      phoneNumbers: list.contact_number,
      country: list.country_name
    })
  }

  save() {

    if (this.publisherForm.valid) {
      this.publisherForm.get('id').value ? this.updatePublisher() : this.savePublisher()
      this.close()
    }
  }


  updatePublisher() {
    let request = {
      uuid: this.publisherForm.get('id').value,
      address1: this.publisherForm.get('address1').value,
      address2: this.publisherForm.get('address2').value,
      publisher_name: this.publisherForm.get('name').value,
      email: this.publisherForm.get('emails').value,
      contact_number: this.publisherForm.get('phoneNumbers').value,
      country_name: this.publisherForm.get('country').value
    }
    if (this.publisherForm.get('id').value) {
      this.publisherLists.forEach(x => {
        if (x.uuid == request.uuid) {
          x.publisher_name = request.publisher_name,
            x.address1 = request.address1,
            x.address2 = request.address2,
            x.email = request.email,
            x.contact_number = request.contact_number,
            x.country_name = request.country_name
        }
      })
    }
  }

  savePublisher() {
    let request = {
      uuid: this.publisherForm.get('id').value,
      address1: this.publisherForm.get('address1').value,
      address2: this.publisherForm.get('address2').value,
      publisher_name: this.publisherForm.get('name').value,
      email: this.publisherForm.get('emails').value,
      contact_number: this.publisherForm.get('phoneNumbers').value,
      country_name: this.publisherForm.get('country').value,
      country_uuid: null,
      site_uuid: null,
      file_path: null,
      file_name: null
    }
    this.publisherLists.push(request)
  }
  close() {
    this.publisherList.matDrawer.close()
    this.publisherList.paginationToggle = true
  }

}

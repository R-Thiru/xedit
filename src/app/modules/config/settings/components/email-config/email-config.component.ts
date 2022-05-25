import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-email-config',
  templateUrl: './email-config.component.html',
  styleUrls: ['./email-config.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfigComponent implements OnInit {
  emailConfigForm: FormGroup;

  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.emailConfigForm = this._formBuilder.group({
      hostname          : [''],
      port    : [''],
      smtptimeout    : [''],
      smtpusername: [''],
      smtppassword       : ['']
    });
  }

  // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
     trackByFn(index: number, item: any): any
     {
         return item.id || index;
     }
}

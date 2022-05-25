import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-multi-factor-authentication',
  templateUrl: './multi-factor-authentication.component.html',
  styleUrls: ['./multi-factor-authentication.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiFactorAuthenticationComponent implements OnInit {

  multiFactorAuthenticationForm: FormGroup;
  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.multiFactorAuthenticationForm = this._formBuilder.group({
      enableMultiFactor          : ['']

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

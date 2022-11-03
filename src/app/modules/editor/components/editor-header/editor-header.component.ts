import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, HostListener, ChangeDetectorRef, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { EditorLayoutComponent } from 'app/layout/layouts/editor/editor.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditorHeaderComponent implements OnInit {
  tabs: string[] = [ 'HOME', 'INSERT', 'TOOLS', 'REVIEWS', 'INDEX', 'OUTPUT', 'FORMATTING', 'TABLE LAYOUT', 'CE TOOLS' ];
  selected = new FormControl(0);
    

  // Declare height and width variables
  public screenWidth: any;  
  public screenHeight: any
  configForm: FormGroup;
  menuToggle:boolean;
  draggable_menu:boolean = false;
  //smallLogo : boolean = false // Defines logo is small or full mode
  isScreenSmall: boolean ;
  navigation: Navigation;
  public drawerOpened: boolean = true;
  public favMenuStar: boolean = true;
  @Input() tooltip: string;
  objectValues = Object.values;
  dragEnabled = true;

  //Total Window Height & Width Resizable
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {  
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;  
    console.log('wid:', this.screenWidth, 'hght', this.screenHeight);
  }  

  constructor(private _http:HttpClient, private _router: Router, private _formBuilder:FormBuilder, private _fuseConfirmationService: FuseConfirmationService, private editor:EditorLayoutComponent, private _changeDetectorRef: ChangeDetectorRef, private _fuseNavigationService: FuseNavigationService

    ) { 
    this.getScreenSize();
   }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight; 
    this.editor.toggleMenus.subscribe(res =>{
      this.menuToggle = res
      // console.log(this.menuToggle)


      // Build the config form
      this.configForm = this._formBuilder.group({
        title      : '',
        message    : 'Do you want to Save before Exit? <span class="font-medium">This action cannot be undone!</span>',
        icon       : this._formBuilder.group({
            show : true,
            name : 'heroicons_outline:exclamation',
            color: 'warn'
        }),
        actions    : this._formBuilder.group({
            confirm: this._formBuilder.group({
                show : true,
                label: 'Yes',
                color: 'accent'
            }),
            cancel : this._formBuilder.group({
                show : true,
                label: 'No'
            })
        }),
        dismissible: true
    });
    }) 
    
    // this.getDragMenu().subscribe(res =>{ console.log(res) })
  }

  // getDragMenu():Observable<any>{
  //   return this._http.get('/assets/json_Files/draggleMenu.json')
  // }

    /**
     * Open Back To Chapters dialog
     */
    openBackToChaptersDialog(): void
     {
        // Open the dialog
        const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
          // console.log('res',result);
          if(result == 'confirmed') {
            console.log("successfully saved and Directed to the chapters..!");
            this._router.navigateByUrl('/projects/details');
          } else {
            console.log("direct to Chapter..!");
          }
      });
     }
}

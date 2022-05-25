import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'account';
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) { }

  /**
   * On init
   */
  ngOnInit(): void {
    // Setup available panels
    this.panels = [
      {
          id         : 'account',
          icon       : 'heroicons_outline:user-circle',
          title      : 'Account',
          description: 'Manage your public profile and private information'
      },
      {
        id         : 'images',
        icon       : 'heroicons_outline:photograph',
        title      : 'Images',
        description: 'Image Optimization'
      },
      {
        id         : 'named-transformation',
        icon       : 'heroicons_outline:collection',
        title      : 'Named Transforms',
        description: 'Define Size & Property for EPuB and XML'
      },
      {
        id         : 'media-library',
        icon       : 'heroicons_outline:film',
        title      : 'Media Library',
        description: 'Media Meta'
      },
      // {
      //     id         : 'backup-clould',
      //     icon       : 'heroicons_outline:cloud-upload',
      //     title      : 'Backup Bucket',
      //     description: 'Backup all media to Cloud'
      // },
      {
          id         : 'multi-factor-authentication',
          icon       : 'heroicons_outline:key',
          title      : 'Multi-factor Authentication',
          description: 'Adds an extra layer of protection to the log-in process'
      },
      {
          id         : 'email-config',
          icon       : 'heroicons_outline:mail',
          title      : 'Email Settings',
          description: 'SMTP Email Settings'
      }

      ];
      // Subscribe to media changes
      this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({matchingAliases}) => {

          // Set the drawerMode and drawerOpened
          if ( matchingAliases.includes('lg') )
          {
              this.drawerMode = 'side';
              this.drawerOpened = true;
          }
          else
          {
              this.drawerMode = 'over';
              this.drawerOpened = false;
          }

          // Mark for check
          this._changeDetectorRef.markForCheck();
      });
  }

  /**
    * On destroy
  */
  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
  // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
     goToPanel(panel: string): void
     {
         this.selectedPanel = panel;
 
         // Close the drawer on 'over' mode
         if ( this.drawerMode === 'over' )
         {
             this.drawer.close();
         }
     }
 
     /**
      * Get the details of the panel
      *
      * @param id
      */
     getPanelInfo(id: string): any
     {
         return this.panels.find(panel => panel.id === id);
     }
 
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

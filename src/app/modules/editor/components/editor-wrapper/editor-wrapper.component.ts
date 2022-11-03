import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AppService } from 'app/app.service';
import { AuthService } from 'app/core/auth/auth.service';
import { EditorInsertComponent } from '../Menu/editor-insert/editor-insert.component';
import { menu, menuList, submenu } from './draggable_menu.model';

@Component({
  selector: 'editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations

})
export class EditorWrapperComponent implements OnInit {
  // public splitEditorView = localStorage.getItem("editorSplit");
  public editorHtml: boolean = true;
  public editorPdf: boolean = true;
  public hide = false;
  public drawerOpened: boolean = true;
  public favMenuStar: boolean = true;
  getMenuAccess: any
  menus: menu[] = menuList;

  constructor(private _matDialog: MatDialog,
    private _router:Router,
    private _appService: AppService) { }

  ngOnInit(): void {

    this._appService.menuChanges.subscribe(res => {
      this.getMenuAccess = res
    })
    
    this._router.events.subscribe(res =>{
      if(res instanceof NavigationEnd){
        res.url.includes('edit') ?  null : this._matDialog.closeAll()
      }
      
    })
  }

  // Split Editor View 
  close(event) {
    if (event == 'html') {
      this.editorHtml = true;
      this.editorPdf = false
    }
    else if ('pdf') {
      this.editorPdf = true;
      this.editorHtml = false
    }

  }

  protected onDragDropped(ev: Event) {
    // console.log(ev)

    ev['source']._dragRef._previewRect = null;

  }
  /**
      * Drag menu Toggle navigation
     */
  toggleNavigation(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  /* 
  * Hide/Show Favourite menu in header bar
  */
  showHideFavouriteMenu(item) {
    this.menus.forEach(x => {
      let a = x.submenu.find(y => y == item)
      if (a == item) {
        item.is_checked = !item.is_checked;
      }
    })
  }
  // trackBy function 
  identifyMenu(index, item) {
    // console.log( 'item', item.name );
    return item.name
  }

  /*
   * SET & CALL FAV MENU FUNCTION  
   */
  submenuOpen(menu) {

    let selectedMenu = menu.display_name;
    if (menu.display_name) {
      const dialogRef = this._matDialog.open(EditorInsertComponent, {
        maxHeight:"100vh",
        maxWidth:"100vw",
        data: selectedMenu
      });
    }
  }
}

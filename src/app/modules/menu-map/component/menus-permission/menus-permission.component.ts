import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/modules/user/user.service';
import * as _ from 'lodash'
import { MenuMapService } from '../../menu-map.service';


@Component({
  selector: 'menus-permission',
  templateUrl: './menus-permission.component.html',
  styleUrls: ['./menus-permission.component.scss'],
  animations:fuseAnimations
})
export class MenusPermissionComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  selectedMenu: any
  selectedAccess: any
  menuMapForm: FormGroup
  is_Selected: boolean = false
  showAlert:boolean = false
  totalmenus: any = []
  menus: any[]
  submenuAcces: any = []
  teams: any = []
  roles: any = []
  mappedMenu: any = []
  activeMenu: any = []
  selectedMenuList: any
  accessShow: boolean = false;

  constructor(private _builder: FormBuilder,
    private _userService: UserService,
    private _menuMapService: MenuMapService) { }

  ngOnInit(): void {
    this.getMenuListData()
    this.menuMapForm = this._builder.group({
      team: ['', Validators.required],
      role: ['', Validators.required],
      isActiveSubmenu: [false],
      isActiveAll: [false]
    })

    this.getTeamData()


    this.menuMapForm.get('role').valueChanges.subscribe(data => {
      let req = {
        team_uuid: this.menuMapForm.get('team').value,
        role_uuid: data
      }
      this.menuMapForm.get('isActiveAll').setValue(false)
      this.selectMenuAll()
      this.selectEditorAll()
      this._menuMapService.getMappedMenuList(req).subscribe(res => {
        if (res.status) {
          this.mappedMenu = res.data
          this.menus.forEach(x => {
            this.mappedMenu.forEach(y => {
              x.uuid == y.uuid ? x.is_active = true : null
              this.patchAccessValue(x, y)
            })
          })
        }
      })
    })
  }




  // Teams Data
  getTeamData() {
    this._userService.getTeams().subscribe(res => {
      if (res) {
        this.teams = res.data
      }
    })
  }


  // Roles Data
  getRole(team) {
    let req = {
      team_uuid: team
    }
    this._userService.getRolesAsTeam(req).subscribe(res => {
      if (res.status) {
        this.roles = res.data
      }
    })

  }

  // Menu List
  getMenuListData() {

    this._menuMapService.getMenuList().subscribe(res => {
      if (res) {
        this.menus = res.data
        this.menus.sort((x, y) => x.is_editor - y.is_editor)

        // For checkBox  value changes into static data to check and uncheck
        this.menus.forEach(x => {
          x.is_active == 1 ? x.is_active = false : x.is_active = true
          if (x.submenu.length > 0) {
            x.submenu.forEach(y => {
              y.is_active = false
              y.access.forEach(z => {
                z.is_active = false
              })
            })
          }
          else if (x.access.length > 0) {
            x.access.forEach(y => {
              y.is_active = false
            })
          }
        })


      }
    })
  }


  // Selected Toogle 
  toggleDetails(menu) {
    if (this.selectedMenu && this.selectedMenu.uuid === menu.uuid) {
      // Close the details
      this.selectedMenu = null
      return;
    }
    // menu.is_active = !menu.is_active
    this.selectedMenu = menu;

  }

  //Submenu Access Open Toggle 
  toggleAccess(access) {
    if (this.selectedAccess && this.selectedAccess.uuid === access.uuid) {
      this.selectedAccess = null
      return;
    }
    this.selectedAccess = access
  }

  // Main Checkbox Status
  selectMenu(menu) {
    menu.is_active = !menu.is_active

    if (menu.submenu.length > 0) {
      menu.is_active ? this.selectedMenu = menu : this.selectedMenu = null
      menu.submenu.forEach(x => {
        menu.is_active ? null : x.is_active = false
      })
    }
    else if (menu.access.length > 0) {
      menu.is_active ? this.selectedMenu = menu : this.selectedMenu = null
      menu.access.forEach(x => {
        menu.is_active ? null : x.is_active = false
      })
    }


  }

  // SubMenu Checkbox Status
  selectSubMenu(child) {
    child.is_active = !child.is_active

    child.is_active ? this.selectedAccess = child : this.selectedAccess = null

    child.access.forEach(x => {
      child.is_active ? null : x.is_active = false
    })

  }

  // Access Checkbox Status
  selectAccess(access) {
    access.is_active = !access.is_active
  }

// For Select All checkbox Main menu
  selectMenuAll() {
    let a = this.menuMapForm.get('isActiveAll').value

    this.menus.forEach(x => {
      x.is_editor == 1 ? null : x.is_active = a

      if (x.submenu.length > 0 ) {
        x.submenu.forEach(y => {
          y.is_active = a
          y.access.forEach(z => {
            z.is_active = a
          })
        })
      }
      else if (x.access.length > 0 ) {
        x.access.forEach(y => {
          y.is_active = a
        })
      }
    })


  }

  // For Select All checkbox Editor menu
  selectEditorAll() {
    let a = this.menuMapForm.get('isActiveAll').value

    this.menus.forEach(x => {
      x.is_editor == 1 ? x.is_active = a : null

      if (x.submenu.length > 0 && x.is_editor == 1) {
        x.submenu.forEach(y => {
          y.is_active = a

        })
      }
    })
  }


  // For Select All checkbox Sub menu
  selectAllSubMenu(menu) {
    let a = this.menuMapForm.get('isActiveSubmenu').value
    menu.submenu.forEach(x => {
      x.is_editor == 1 ? null : x.is_active = a
      x.access.forEach(y => {
        y.is_active = a
      })

    })


  }


  // PatchValue After Get Team and Role
  patchAccessValue(x, y) {

    if (y.access) {
      let a = y.access.filter(m => m.uuid)
      if (x.submenu.length > 0) {
      }
      else if (x.access.length > 0) {
        x.access.forEach(b => {
          a.forEach(c => {
            c.uuid == b.uuid ? b.is_active = true : null
          })
        })
      }
    }
    else if (y.submenu) {
      let a = y.submenu.filter(m => m.uuid)
      if (x.submenu.length > 0) {
        x.submenu.forEach(b => {
          a.forEach(c => {
            c.uuid == b.uuid ? b.is_active = true : null
            c.access.forEach(d => {
              this.submenuAcces.push(d.uuid)
              this.submenuAcces = _.uniqWith(this.submenuAcces, _.isEqual);
              b.access.forEach(e => {
                e.uuid.includes(d.uuid) ? e.is_active = true : null
              })
            })
          })
        })
      }
      else if (x.access.length > 0) {

      }
    }
  }



  // Submit After Select

  mappedMenus() {
    let activeMenu = []
    this.menus.forEach(x => {
      if (x.is_active) {
        activeMenu.push(x)
        this.getUuids(activeMenu)
      }

    })
    this.saveMenuMap(this.selectedMenuList)

  }

  getUuids(data) {
    let req = {
      menu: [],
      access: [],
      details: {
        team_uuid: this.menuMapForm.get('team').value,
        role_uuid: this.menuMapForm.get('role').value
      }
    }

    data.forEach(x => {
      req.menu.push({ uuid: x.uuid })
      if (x.submenu.length > 0) {
        x.submenu.forEach(y => {
          if (y.is_active) {
            req.menu.push({ uuid: y.uuid })
            y.access.forEach(z => {
              z.is_active ? req.access.push({ uuid: z.uuid }) : null
            })
          }
        })
      }
      else if (x.access.length > 0) {
        x.access.forEach(temp => {
          temp.is_active ? req.access.push({ uuid: temp.uuid }) : null
        })
      }
    })


    this.selectedMenuList = req


  }


  // Saved Menu Mapping

  saveMenuMap(data) {
    this._menuMapService.saveMenuMap(data).subscribe(res => {
      if(res.status){
        this.showAlert = true
        this.alert = {
          message : res.message,
          type : 'success'
        }
      }
    },(error)=>{
      this.showAlert = true
      this.alert = {
        message : error.error.message,
        type:'error'
      }
    })
  }


   // Output from alert component
   output(item) {
    this.showAlert = !item
  }


}



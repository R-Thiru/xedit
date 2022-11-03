import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MaterialModule } from 'app/shared/material.modules';
import { SharedModule } from 'app/shared/shared.module';
import { fuseAnimations } from '@fuse/animations';
import { ProfileTabComponent } from './component/profile-tab/profile-tab.component';
import { SecurityTabComponent } from './component/security-tab/security-tab.component';
import { NotifyTabComponent } from './component/notify-tab/notify-tab.component';
import { FuseAlertModule } from '@fuse/components/alert';


const routes:Routes = [
  {
    path:'',
    component:UserProfileComponent
  }
]

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileTabComponent,
    SecurityTabComponent,
    NotifyTabComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    FuseAlertModule
  ]
})
export class ProfileModule { }

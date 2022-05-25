import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';

import { SettingsComponent } from './components/settings/settings.component';

import { settingsRoutes } from './settings.routing';
import { MultiFactorAuthenticationComponent } from './components/multi-factor-authentication/multi-factor-authentication.component';
import { BackupComponent } from './components/backup/backup.component';
import { MediaLibraryComponent } from './components/media-library/media-library.component';
import { NamedTransformsComponent } from './components/named-transforms/named-transforms.component';
import { ImageOptimizationComponent } from './components/image-optimization/image-optimization.component';
import { UserAccountsComponent } from './components/user-accounts/user-accounts.component';
import { EmailConfigComponent } from './components/email-config/email-config.component';


@NgModule({
  declarations: [
    SettingsComponent,
    MultiFactorAuthenticationComponent,
    BackupComponent,
    MediaLibraryComponent,
    NamedTransformsComponent,
    ImageOptimizationComponent,
    UserAccountsComponent,
    EmailConfigComponent
  ],
  imports: [
    RouterModule.forChild(settingsRoutes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatSlideToggleModule,
    FuseAlertModule,
    SharedModule
  ]
})
export class SettingsModule { }

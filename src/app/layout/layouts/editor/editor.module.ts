import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from '@fuse/components/fullscreen';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { QuickChatModule } from 'app/layout/common/quick-chat/quick-chat.module';
import { QuickMenuModule } from 'app/layout/common/quick-menu/quick-menu.module';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';

import { EditorLayoutComponent } from 'app/layout/layouts/editor/editor.component';
import { MaterialModule } from 'app/shared/material.modules';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [
        EditorLayoutComponent,
        DialogComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        FuseLoadingBarModule,
        FuseFullscreenModule,
        FuseNavigationModule,
        LanguagesModule,
        MessagesModule,
        NotificationsModule,
        QuickChatModule,
        QuickMenuModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule,
        MaterialModule
    ],
    exports     : [
        EditorLayoutComponent
    ]
})
export class EditorLayoutModule
{
}

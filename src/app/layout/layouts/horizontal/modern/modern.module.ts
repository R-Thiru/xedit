import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from '@fuse/components/fullscreen';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { QuickChatModule } from 'app/layout/common/quick-chat/quick-chat.module';
import { SharedModule } from 'app/shared/shared.module';
import { ModernLayoutComponent } from 'app/layout/layouts/horizontal/modern/modern.component';
import { EditorModule } from 'app/modules/editor/editor.module';
import { QuickMenuModule } from 'app/layout/common/quick-menu/quick-menu.module';




@NgModule({
    declarations: [
        ModernLayoutComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        EditorModule,
        QuickChatModule,
        SharedModule,
        QuickMenuModule
        
    ],
    exports: [
        ModernLayoutComponent
    ]
})
export class ModernLayoutModule {
}

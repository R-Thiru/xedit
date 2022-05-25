import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FuseCardModule } from "@fuse/components/card";
import { MaterialModule } from "app/shared/material.modules";
import { SharedModule } from "app/shared/shared.module";
import { StagesRoutingModule } from "./stages.routing.modules";
import { TranslocoModule } from "@ngneat/transloco";
import { PipeModule } from "app/shared/pipes/pipes.module";
import { ProcessListComponent } from './component/process-list/process-list.component';
import { ProcessComponent } from './component/process/process.component';
import { StagesListComponent } from "./component/stages-list/stages-list.component";
import { StagesComponent } from "./component/stages/stages.component";
import { TeamMappingComponent } from "./component/teamMapping/teamMapping.component";
import { FuseMasonryModule } from "@fuse/components/masonry";
import { TagsComponent } from './component/teamMapping/tags/tags.component';

@NgModule({
   
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        FuseCardModule,
        TranslocoModule,
        PipeModule,
        FuseMasonryModule,
        StagesRoutingModule
    ],
    declarations: [
        ProcessListComponent,
        TeamMappingComponent,
        ProcessComponent,
        StagesComponent,
        StagesListComponent,
        TagsComponent,
        
    ],
    exports: [
        
       
    ]
})

export class StagesModule {

}
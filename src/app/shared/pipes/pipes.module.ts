import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SearchPipe } from "./search.pipe";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SearchPipe
    ],
    declarations: [
        SearchPipe
    ]
})
export class PipeModule {

}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRequestService } from './data-request.service';
import { DataService } from './data.service';


@NgModule({
    declarations: [],
    imports: [
      CommonModule
    ],
    providers: [
        DataRequestService,
        DataService,
    ]
})
export class CoreModule { }

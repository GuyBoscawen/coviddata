import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/core/data.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    constructor(
        public dataService: DataService,
    ) { }

    ngOnInit() {
    }

}

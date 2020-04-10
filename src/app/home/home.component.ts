import { Component, OnInit, ViewChild } from '@angular/core';
import { NovelCovid } from 'novelcovid';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

const track = new NovelCovid();

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['position', 'country', 'cases', 'deaths', 'critical', 'todayCases', 'todayDeaths'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
      console.log(track.countries());

      track.countries().then(
          (data) => {
              this.dataSource = new MatTableDataSource<PeriodicElement>(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort
      })
  }

}

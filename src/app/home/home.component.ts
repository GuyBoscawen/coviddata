import { Component, OnInit, ViewChild } from '@angular/core';
import { NovelCovid } from 'novelcovid';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { NgxChartsModule } from '@swimlane/ngx-charts';

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

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  // xAxisTicks: any[] = ["Jan", "Feb"]

  plot: any[];
  selectedCountry: string;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  assignPlot(data) {
      let countryName = data.country
      console.log(data)
      let plot = [
          {
              "name": countryName + " cases",
              "series": []
          },
          {
              "name": countryName + " deaths",
              "series": []
          },
      ];

      let cases = data.timeline.cases;
      let deaths = data.timeline.deaths;

      Object.keys(cases).forEach(function(key) {
          plot[0].series.push(
              {
                  "name": key,
                  "value": cases[key]
              }
          );
      });

      Object.keys(deaths).forEach(function(key) {
          plot[1].series.push(
              {
                  "name": key,
                  "value": deaths[key]
              }
          );
      });

      this.plot = plot;
      console.log(data)
  }

  xAxisTickFormatting(val) {
      let formattedDate = new Date(val);
      let monthIndex = formattedDate.getMonth();
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return val[2] + val[3] + ' ' + months[monthIndex];
  }

  displayGraph(event) {
    this.selectedCountry = event.target.innerHTML
    track.historical(null, this.selectedCountry).then(
        (data) => {
            this.assignPlot(data);
        }
    );
  }

  ngOnInit() {
      console.log(track.countries());

      track.countries().then(
          (data) => {
              this.dataSource = new MatTableDataSource<PeriodicElement>(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
      })

      // track.historical(null, 'UK').then(
      //     (data) => {
      //         this.assignPlot(data);
      //     }
      // );
  }

}

import { Component, OnInit } from '@angular/core';
import { NovelCovid } from 'novelcovid';

const track = new NovelCovid();


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
      // window.actionSheetController = actionSheetController;
  }

  ngOnInit() {
      console.log(track.countries());
  }

}

/*
dashboard taking city name as input and passing it down to Weather or Forecast component.
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  city: string;

  constructor() {
  }

  ngOnInit() {
  }
}

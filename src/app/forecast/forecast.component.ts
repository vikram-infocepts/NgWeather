/*
Forecast component taking city name as query string and calling core service to get data.
*/

import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from './../core/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { List } from './../shared/models/forecast/list.model';
import { Forecast } from './../shared/models/forecast/forecast.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, OnDestroy {
  forecast: Forecast;
  // holds api filtered data. As api is returning 5 days per 3 hours data. we are tking only 5 days first element.
  data: Array<List> = [];
  private prevDate: string = new Date().toDateString();
  error: HttpErrorResponse;
  timer: any;
  baseImgSrc: string;

  constructor(private route: ActivatedRoute, private service: WeatherService) { }

  ngOnInit() {
    this.baseImgSrc = environment.baseImgSrc;
    this.getForecast();

    // start timer to refresh data every 60 secs
    this.timer = setInterval(() => {
      this.getForecast();
    }, 60 * 1000);
  }

  getForecast() {
    this.error = this.forecast = null;
    this.data = [];
    const city = this.route.snapshot.paramMap.get('city');

    if (city !== '') {
      this.service.getForecast(city).subscribe(
        (data: any) => {
          this.forecast = data.data;
          this.forecast.list.forEach(val => {
            // filter data to get first per day
            if (this.prevDate !== new Date(val.dt * 1000).toDateString()) {
              this.prevDate = new Date(val.dt * 1000).toDateString();
              this.data.push(this.forecast.list.find(val1 => {
                if (new Date(val1.dt * 1000).toDateString() === this.prevDate) {
                  return true;
                }
              }));
            }
          });
        },
        (data: HttpErrorResponse) => { this.forecast = null; this.error = data; });
    }
  }

  ngOnDestroy() {
    // stop timer to refresh data every 60 secs
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}

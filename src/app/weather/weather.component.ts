/*
Weather component taking city name as query string and calling core service to get data.
*/

import { environment } from './../../environments/environment';
import { WeatherService } from './../core/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Current } from './../shared/models/current/current.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  current: Current;
  error: HttpErrorResponse;
  timer: any;
  baseImgSrc: string;

  constructor(private route: ActivatedRoute, private service: WeatherService) { }

  ngOnInit() {
    this.baseImgSrc = environment.baseImgSrc;
    this.getWeather();

    // start timer to refresh data every 60 secs
    this.timer = setInterval(() => {
      this.getWeather();
    }, 60 * 1000);
  }

  getWeather() {
    this.current = this.error = null;
    const city = this.route.snapshot.paramMap.get('city');

    if (city !== '') {
      this.service.getWether(city).subscribe(
        (data: any) => this.current = data.data,
        (data: HttpErrorResponse) => {this.current = null; this.error = data; });
    }
  }

  ngOnDestroy() {
    // stop timer to refresh data every 60 secs
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}

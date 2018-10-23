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
  city: string;
  timer: any;

  constructor(private route: ActivatedRoute, private service: WeatherService) { }

  ngOnInit() {
    this.city = this.route.snapshot.paramMap.get('city');

    this.getWeather();
    this.timer = setInterval(() => {
      this.getWeather();
    }, 60 * 1000);
  }

  getWeather() {
    this.current = this.error = null;

    if (this.city !== '') {
      this.service.getWether(this.city).subscribe(
        (data: Current) => this.current = data,
        (data: HttpErrorResponse) => {this.current = null; this.error = data; });
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}

/*
Service gettging data from weather api.
Weather Api url is picked from config.
*/
import { Forecast } from './../shared/models/forecast/forecast.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Current } from '../shared/models/current/current.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWether(city: string): Observable<Current> {
    return this.http.get<Current>(environment.baseUrl + `weather/${city}`);
  }

  getForecast(city: string): Observable<Forecast> {
    return this.http.get<Forecast>(environment.baseUrl + `forecast/${city}`);
  }
}

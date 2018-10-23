import { Sys } from './../sys.model';
import { Wind } from './../wind.model';
import { Clouds } from './../clouds.model';
import { Weather } from './../weather.model';
import { Main } from './../main.model';

export class List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  sys: Sys;
  dt_txt: string;
}

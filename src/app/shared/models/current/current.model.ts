import { Sys } from '../sys.model';
import { Clouds } from '../clouds.model';
import { Wind } from '../wind.model';
import { Main } from '../main.model';
import { Coord } from '../coord.model';
import { Weather } from '../weather.model';

export class Current {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
}

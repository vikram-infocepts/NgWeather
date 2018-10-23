import { City } from './city.model';
import { List } from './list.model';

export class Forecast {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

import { Injectable  }        from '@angular/core';
import { Http }               from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DinersService {
  private _key = 'AIzaSyDX4a7ppdimXP4Tny0UCOmvPW7xBiPyFc4';
  private _baseUrls = 'https://maps.googleapis.com/maps/api/place/nearbysearch'
    + '/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&'
    + 'keyword=cruise&key='
    + this._key;

  constructor(private _http: Http) { }

  getUsers() {
      return this._http.get(this._baseUrls)
          .map(res => res.json());
  }
}

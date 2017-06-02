import { Injectable  }        from '@angular/core';
import { Http }               from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class WineriesService {
  private _baseUrls = 'https://pec-playground.herokuapp.com/wineries';

  constructor(private _http: Http) { }

  getWineries() {
      return this._http.get(this._baseUrls)
          .map(res => res.json());
  }
}

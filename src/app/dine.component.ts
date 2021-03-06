import { Component, OnInit }        from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import                              'rxjs/add/observable/forkJoin';

import { DinersService }            from './diners.service';

@Component({
  selector: 'dine-page',
  templateUrl: '../assets/views/dine.html',
  styleUrls: ['../assets/css/display.css']
})
export class DineComponent implements OnInit {
  //view controls
  isLoading               = true;
  sortBy                  = true;
  listMapView             = true;
  //array of data to display
  diners                  = [];
  //custom asset links
  private _undefinedLogo  = '../assets/img/WINE_01-1.jpg';
  markerIconUrl           = '../assets/img/marker.png';
  //map control
  lat:        number      = 44.0003;
  lng:        number      = -77.2505;
  zoom:       number      = 12;
  highZoom:   number      = 18;

  constructor(private _dinersService : DinersService){
  }

  ngOnInit(){
    this._dinersService.getDiners()
      .subscribe(res => {
        /**
        * Number of reviews capped at 5
        * generating fake random values
        **/
        for (var i = 0; i < res.length; i++){
          res[i].numberOfReviews = this.getRating();
          if (res[i].photoUrl == null){
            res[i].photoUrl = this._undefinedLogo;
          }
        }
        this.diners = res;
        this.updateSortRating();
      },
      null,
      () => {this.isLoading = false}
      );
  }

  getRating() {
    return Math.floor(Math.random() * 40) + 1;
  }

  updateSortRating(){
    this.sortBy = true;
    this.diners.sort(function(a, b){return b.rating-a.rating});
  }

  updateSortReviewed(){
    this.sortBy = false;
    this.diners.sort(function(a, b){return b.numberOfReviews-a.numberOfReviews});
  }

  listMapViewUpdateList(){
    this.listMapView = !this.listMapView;
  }

  listMapViewUpdateMap(){
    this.listMapView = !this.listMapView;
  }

  onMarkerClick(lat, lng){
    this.lat = lat;
    this.lng = lng;
    this.zoom = this.highZoom;
  }
}

import { Component, OnInit }        from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import                              'rxjs/add/observable/forkJoin';

import { DinersService }            from './diners.service';

@Component({
  selector: 'dine-page',
  templateUrl: '../assets/views/dine.html',
  styleUrls: ['../assets/css/dine.css']
})
export class DineComponent {
  isLoading = true;
  diners = [];
  /**
  * true -> sort by rating
  * false -> sort by number of reviews
  **/
  sortBy = true;
  private _undefinedLogo = '../assets/img/WINE_01-1.jpg';
  listMapView = true;

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

}

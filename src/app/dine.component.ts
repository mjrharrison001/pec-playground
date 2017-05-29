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
  private _sort = true;

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
        }
        this.diners = res;
      },
      null,
      () => {this.isLoading = false}
      );
  }

  getRating() {
    return Math.floor(Math.random() * 20) + 1;
  }

  sortList(){
    this.diners.sort();
  }
}

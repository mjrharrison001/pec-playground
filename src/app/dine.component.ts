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
  rating = 0;

  constructor(private _dinersService : DinersService){
  }

  ngOnInit(){
    this._dinersService.getDiners()
      .subscribe(res => {
        console.log(res);
        this.diners = res;
      },
      null,
      () => {this.isLoading = false}
      );
  }

  getRating() {
    this.rating = Math.floor(Math.random() * 20) + 1;
    return this.rating;
  }
}

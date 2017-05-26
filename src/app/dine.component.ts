import { Component, OnInit }        from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import                              'rxjs/add/observable/forkJoin';

import { DinersService }            from './diners.service';

@Component({
  selector: 'dine-page',
  template: `
            <div class="container">
            <h1>Restaurants</h1>
            <div class="row">
            <i *ngIf="isLoading" class="fa fa-spinner fa-spin fa-20x"></i>
            <div class="col-md-12">
              <table class="table table-bordered">
              <tr><th>Name</th><th>Email</th><th>Edit</th><th>Delete</th></tr>
              <tr *ngFor="let dine of diners">
                <td><img alt="Store Image" src="{{dine.icon}}"></td>
                <td>{{ dine.name }}</td>
                <td><a><i class="glyphicon glyphicon-edit"></i></a></td>
                <td><a><i class="glyphicon glyphicon-remove"></i></a></td>
              </tr>
              </table>
            </div>
            </div>
            </div>
            `,
    styleUrls: ['../assets/css/map.css'],
})
export class DineComponent {
  isLoading = true;
  diners = [];

  constructor(private _dinersService : DinersService){
  }

  ngOnInit(){
    this._dinersService.getUsers()
      .subscribe(res => {
        console.log(res);
        this.diners = res;
      },
      null,
      () => {this.isLoading = false}
      );
  }
}

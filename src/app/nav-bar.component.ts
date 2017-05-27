import { Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: '../assets/views/nav-bar.html'
})
export class NavComponent {
  public isCollapsed:boolean = true;

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }
}

import { Component } from '@angular/core';
//import {Router} from '@angular/router';
@Component({
  selector: 'home-page',
  template: `
            <div class="container">
              <div class=".col-md-12">
                <h2>Description</h2>
                <p>TODO: Create a demo application that can be used
                by travelers, to find travel information  in the
                Prince Edward County.</p>
              </div>
            </div>
            `,
  styles: [`
      #map {
        height: 100%;
      }
    `]
})
export class HomeComponent {
}

import { Component } from '@angular/core';
//import {Router} from '@angular/router';
@Component({
  selector: 'map-page',
  templateUrl: '../assets/views/map.html',
  styleUrls: ['../assets/css/map.css'],
})
export class MapComponent {
  title: string = 'Explore Prince Edward County';
  lat: number = 44.0003;
  lng: number = -77.2505;
}

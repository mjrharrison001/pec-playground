import { Router, RouterModule }         from '@angular/router';
import { HomeComponent }                from './home.component';
import { MapComponent }                 from './map.component';
import { DineComponent }                from './dine.component';

export const routing = RouterModule.forRoot([
  {path: '',        component: HomeComponent},
  {path: 'dine',    component: DineComponent},
  {path: 'shop',    component: HomeComponent},
  {path: 'wine',    component: HomeComponent},
  {path: 'map',     component: MapComponent},
  {path: '**',      component: HomeComponent}
]);

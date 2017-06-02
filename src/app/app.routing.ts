import { Router, RouterModule }         from '@angular/router';
import { HomeComponent }                from './home.component';
import { MapComponent }                 from './map.component';
import { DineComponent }                from './dine.component';
import { ShopComponent }                from './shop.component';
import { WineComponent }                from './wine.component';

export const routing = RouterModule.forRoot([
  {path: '',        component: HomeComponent},
  {path: 'dine',    component: DineComponent},
  {path: 'shop',    component: ShopComponent},
  {path: 'wine',    component: WineComponent},
  {path: 'map',     component: MapComponent},
  {path: '**',      component: HomeComponent}
]);

import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { JsonpModule }      from '@angular/http';
import { AlertModule }      from 'ngx-bootstrap';
import { CollapseModule }   from 'ngx-bootstrap/collapse';

import { routing }          from './app.routing';

import { AppComponent }     from './app.component';
import { NavComponent }     from './nav-bar.component';
import { HomeComponent }    from './home.component';
import { MapComponent }     from './map.component';
import { AgmCoreModule }    from 'angular2-google-maps/core';
import { DineComponent }    from './dine.component';
import { DinersService }    from './diners.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDX4a7ppdimXP4Tny0UCOmvPW7xBiPyFc4',
      libraries: ['places']
    }),
    JsonpModule,
    AlertModule.forRoot(),
    CollapseModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    MapComponent,
    DineComponent
  ],
  providers: [
    DinersService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

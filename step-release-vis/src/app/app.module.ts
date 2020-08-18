import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SvgGridComponent} from './components/grid/svg/svg';
import {CanvasGridComponent} from './components/grid/canvas/canvas';
import {HomeComponent} from './components/home/home';
import {EnvironmentComponent} from './components/environment/environment';

@NgModule({
  declarations: [
    AppComponent,
    SvgGridComponent,
    CanvasGridComponent,
    HomeComponent,
    EnvironmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
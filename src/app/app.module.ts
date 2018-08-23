import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [AppComponent, WeatherComponent, DailyWeatherComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}

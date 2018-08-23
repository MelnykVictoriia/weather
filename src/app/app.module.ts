import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherService } from './weather.service';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent, WeatherComponent, DailyWeatherComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5OVcqswPubjJdgfpInFabGb3csrK7Ckw', libraries: ['places'], language: 'en'
    })],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}

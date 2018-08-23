import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public cityName: string;
  loading = false;
  weather: any[];
  today: number = Date.now();

  constructor(public weatherService: WeatherService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.cityName = this.route.snapshot.queryParamMap.get('city');
    if (this.cityName) {
      this.getWeatherByCity();
    }
  }

  getLocationWeather = () => {
    this.loading = true;
    this.weatherService
      .getLocation()
      .then((position: { latitude: number; longitude: number }) =>
        this.weatherService.getHourlyLocationWeather(position).subscribe(response => {
          this.loading = false;
          this.cityName = response.city_name;
          this.weather = response.data;
        })
      )
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
  };

  getWeatherByCity = () => {
    this.loading = true;
    this.weatherService.getHourlyCityWeather(this.cityName).subscribe(response => {
      this.loading = false;
      this.weather = response.data;
    });
  };
}

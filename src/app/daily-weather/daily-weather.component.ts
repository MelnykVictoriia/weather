import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css'],
})
export class DailyWeatherComponent implements OnInit {
  cityName: string | null;
  dailyReport: any[] | null;
  loading = false;
  err: string;
  constructor(public weatherService: WeatherService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.cityName = this.route.snapshot.queryParamMap.get('city');

    if (this.cityName) {
      this.loading = true;
      this.weatherService.getDailyCityWeather(this.cityName).subscribe(resp => {
        this.loading = false;
        this.dailyReport = resp;
        console.log('daily', this.dailyReport);
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}

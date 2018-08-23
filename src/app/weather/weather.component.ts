import { Component, OnInit,  NgZone, ViewChild, ElementRef} from '@angular/core';
import { WeatherService } from '../weather.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { } from 'googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

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

  public searchControl: FormControl;
  city_name: any;
  google: any;

  constructor(public weatherService: WeatherService, private route: ActivatedRoute, private router: Router,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

    @ViewChild('search')
    public searchElementRef: ElementRef;
  ngOnInit() {

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['(cities)']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.weatherService.city = place.name;
        });
      });
    });
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
          this.weatherService.city = response.city_name;
          this.weather = response.data;
        })
      )
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
  }

  getWeatherByCity = () => {
    this.loading = true;
    this.weatherService.getHourlyCityWeather(this.weatherService.city).subscribe(response => {
      this.loading = false;
      this.weather = response.data;
    });
  }
}

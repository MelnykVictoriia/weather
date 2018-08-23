import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private apiBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/';
  private apiKey = 'be0b87ebd406401792d51239944fad5e';
  public city: any;

  constructor(private httpClient: HttpClient) {}

  getLocation = () =>
    new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position =>
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          () => reject(new Error('Geolocation is rejected'))
        );
      } else {
        reject(new Error('Geolocation is not supported'));
      }
    })

  getHourlyCityWeather = (cityName: string): Observable<any> =>
    this.httpClient
      .get<any>(`${this.apiBaseUrl}hourly?city=${cityName}&key=${this.apiKey}&hours=24`)
      .pipe(map(this.parseHourlyResponse))

  getHourlyLocationWeather = ({ longitude, latitude }: { longitude: number; latitude: number }): Observable<any> =>
    this.httpClient
      .get<any>(`${this.apiBaseUrl}hourly?lat=${latitude}&lon=${longitude}&key=${this.apiKey}&hours=24`)
      .pipe(map(this.parseHourlyResponse))

  getDailyCityWeather(cityName: string): Observable<any> {
    const apiCall = `${this.apiBaseUrl}daily?city=${cityName}&key=${this.apiKey}`;
    return this.httpClient.get<any>(apiCall).pipe(
      map(response => {
        if (!response || !Array.isArray(response.data)) {
          return [];
        }
        return response.data.slice(1, 11);
      })
    );
  }

  private parseHourlyResponse = response => {
    if (!response || !Array.isArray(response.data)) {
      return {
        data: [],
      };
    }
    return {
      city_name: response.city_name,
      data: response.data
        .map(weatherItem => ({
          timestamp_local: weatherItem.timestamp_local,
          weather: weatherItem.weather,
          temp: Math.round(weatherItem.temp),
          hour: new Date(weatherItem.timestamp_local).getHours(),
        }))
        .sort(
          (weatherItem, weatherItemB) =>
            new Date(weatherItem.timestamp_local).getTime() - new Date(weatherItemB.timestamp_local).getTime()
        ),
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Location{
  latitude: string;
  longtitude: string;
}
@Injectable({
  providedIn: 'root'
})

export class MapService {

  constructor(private http: HttpClient) { }
  getLocation(){
    return this.http.get<Location>('https://ipapi.co/61.239.253.42/json/');
  }
}

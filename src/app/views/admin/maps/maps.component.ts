import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from 'src/app/app-services/map-services/map.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;


  ngOnInit() {
    this.setCurrentLocation();
  }

    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 15;
        });
      }
    }
 
    logout() {
      localStorage.clear();
      window.location.href = "/homePage";
    }
  
}

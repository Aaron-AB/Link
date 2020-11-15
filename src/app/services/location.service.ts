import { Injectable } from '@angular/core';
import { GeolocationPosition, Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  coords: any;
  constructor() { }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition({'maximumAge': 10, 'enableHighAccuracy': true});
    this.coords = coordinates.coords;
    console.log(this.coords);
  }

  degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

  distanceToCoordinateInMetres(targetCoords: GeolocationPosition) {
    let earthRadiusMetres = 6371000;
    let deltaLat = this.degreesToRadians(targetCoords.coords.latitude - this.coords.latitude);
    let deltaLon = this.degreesToRadians(targetCoords.coords.latitude - this.coords.latitude);
    let latInRadians = this.degreesToRadians(this.coords.latitude);
    let targetLatInRadians = this.degreesToRadians(targetCoords.coords.latitude);
    let temp = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2) * Math.cos(latInRadians) * Math.cos(targetLatInRadians); 
    return 2 * earthRadiusMetres * Math.atan2(Math.sqrt(temp), Math.sqrt(1-temp));
  }

  withinRange(targetCoords: GeolocationPosition, metres: number) {
    return this.distanceToCoordinateInMetres(targetCoords) <= metres;
  }
}

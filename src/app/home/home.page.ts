import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private fire: FirebaseService, private location: LocationService) {
    location.locate();
  }
}

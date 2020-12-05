import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocationService } from '../services/location.service';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  matchArr= [];
  matches=[];

  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: true,
    slidesPerView: 1,
    speed: 300
  }
  
  constructor(
    private fire: FirebaseService, 
    private match: MatchesService,
    private router: Router) {
    //location.locate();
  }

  //Generates all potential matches
  ngOnInit() {
    this.match.getProductsArr().subscribe(res => {
      this.matchArr = res;
      console.log(this.matchArr);
    })
  }

  //Navigates to the friend page when you click recommend
  addMatch(val) {
    this.storeID(val);
    this.router.navigate(['friends']);
  }

  storeID(local) {
    localStorage.setItem("match", local);
  }

}

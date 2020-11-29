import {
  Component,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from "@angular/core";
import { GestureCtrlService } from "src/app/providers/gestureCtrl-service/gesture-ctrl.service";
import { IonCard, Platform } from "@ionic/angular"; 
import * as firebase from 'firebase'; 
import { FirebaseService } from '../../app/services/firebase.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
@Component({
  selector: "app-swiper-gesture",
  templateUrl: "./swiper-gesture.page.html",
  styleUrls: ["./swiper-gesture.page.scss"],
})
export class SwiperGesturePage implements OnInit, AfterViewInit {
  //people = [];  
  
  posts=[];

  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;

  constructor(private gestureCtrlService: GestureCtrlService ,
    private platform: Platform,
    private sanitizer: DomSanitizer, 
    public fireService : FirebaseService, 
    public router: Router) {}

  ngOnInit() {  
    this.fireService.read_record("Users").subscribe(data => {

      this.posts = data.map(e => {
    
        return {
          //id: e.payload.doc.id,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'], 
          ProfilePicture: e.payload.doc.data()['profilePicture'], 
        };
    
      })
      console.log(this.posts);
     });

  }

  

  ngAfterViewInit() {
    const cardArray = this.cards.toArray();
    this.gestureCtrlService.useSwiperGesture(cardArray);
  } 


}//end export class()

import { NgModule, Sanitizer} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from "@angular/router";
import { Component, ElementRef, ViewChild, OnInit, Input} from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Capacitor, PhotosAlbumType } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';   

import * as firebase from 'firebase'; 
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
//import { getMaxListeners } from 'cluster'; 
import {ɵunwrapSafeValue as unwrapSafeValue} from "@angular/core";
import { map } from 'rxjs/operators'; 
import {NgForm} from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit { 
  @ViewChild('initPP') initPP: ElementRef; 
  getimagetest;
  email: string; 
  name: string;
  constructor( 
    private platform: Platform,
    private sanitizer: DomSanitizer, 
    private fireService : FirebaseService, 
    public router: Router,
  ) { }

  ngOnInit() { 
    console.log(this.fireService.read_record().subscribe(testUsers => {
      console.log('Observable:',testUsers);  
      this.getimagetest = testUsers[0].profilePicture; 
      this.email = testUsers[0].email; 
      this.name = testUsers[0].name;
      //console.log(this.getimagetest); 
      this.initPP.nativeElement.style.image = " {{getimagetest}}";

      //var testUsers = testUsers;  
      //console.log(testUsers.values()); 
    }
      ) );
  }

}

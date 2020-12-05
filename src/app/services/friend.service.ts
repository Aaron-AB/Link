import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private posts = new Observable<any[]>();
  currentUser: User = null;
  uid;

  //Grabs the auth state of the current user
  constructor(private af: AngularFireAuth, 
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore) {
    this.af.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.uid = this.currentUser.uid;
      console.log(this.firebaseService.getDoc("Users", this.uid));
    })//





  }



}
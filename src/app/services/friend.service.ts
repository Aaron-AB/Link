import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  currentUser: User = null;
  constructor(private af: AngularFireAuth) {
    this.af.onAuthStateChanged((user) => {
      this.currentUser = user;
      console.log(this.currentUser.uid);
    });
   }

   test(){
     return this.currentUser
   }
}
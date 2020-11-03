import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FriendhelperService {

  constructor(private af:AngularFireAuth,private firebaseService: FirebaseService) { }
  async getid(){
    let user = await this.af.currentUser

  var friendnames = []


 await this.firebaseService.get_where("friendships","uid", user.uid).subscribe(res => {
   var Arr = res;

   for(var a of Arr){
    friendnames.push(a.data.name);
   }  
  
 })
//console.log(friendnames);
    return friendnames;
  }
}

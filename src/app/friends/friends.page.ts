import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  constructor(private af:AngularFireAuth,private firebaseService: FirebaseService ) { }

  ngOnInit() {
  }
  async addfriend(){
    let user = await this.af.currentUser
    //name= document.getElementById("myfriend").value;
    var data= {
     user: user.displayName,
     userid:user.uid,
    }
    

  //console.log(this.firebaseService.get_where("Users","name","John Cena"));
 this.firebaseService.get_where("Users","name","John Cena").subscribe(res => {
  var Arr = res;
  console.log(Arr);
  var items = Arr[0].data.Data;

  console.log(items);
  console.log(JSON.stringify(items));
})
    //console.log(data);
   // this.firebaseService.create_record(data,"friends");
  }
}

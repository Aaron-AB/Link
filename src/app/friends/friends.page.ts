import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Toast } from '@capacitor/core';
import { FirebaseService } from '../services/firebase.service';
import { FriendhelperService } from '../services/Friendhelper.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friendnames = [];
  userId;
  clicked = false;
  constructor(private af:AngularFireAuth,private firebaseService: FirebaseService ,private fhelper: FriendhelperService) {
    

    
   }

 ngOnInit() {
  //this.af.authState.subscribe( user => {
  //  if (user) { this.userId = user.uid }
 // });
 // console.log(this.userId);
 // this.start();
 console.log(this.fhelper.getid());

  }
async start(btn){
 //var friendnames = []
 if(!this.clicked){
  let user = await this.af.currentUser
  console.log(user);
 
  await this.firebaseService.get_where("friendships","uid", user.uid).subscribe(res => {
    var Arr = res;

    for(var a of Arr){
      this.friendnames.push(a.data.name);
    }  
   
  })
console.log(this.friendnames);
this.clicked=true;}
}
 //funtion used too add a friend too friendships collection in firebase using there email
  async addfriend(friendemail){
   //checks too see if there is a value in the input
    if(friendemail.value){
       //this gets the currrent user
    let user = await this.af.currentUser

//this checks too see if the friend that user is tring too add exists in the database
 this.firebaseService.get_where("Users","email",friendemail.value).subscribe(res => {
  var Arr = res;
  //if the user is not found an error message is printed
  if(Arr.length==0){
  alert("User not found");
  }
  else{
    //if the user is found an object it prepared too send too the friendships collection
    var obj ={
      //friend's email,name and record
      //user's uid
       email:Arr[0].data.email,
       name: Arr[0].data.name,
       record:Arr[0].id,
       uid: user.uid

    };
//the object is send too the firebase collection
this.firebaseService.create_record(obj,"friendships");
//the user is notified that they have added their friend
alert("friend added");

  }
  
})
//the input value cleared
    friendemail.value="";
}
  }
  async tester(){
  let user = await this.af.currentUser
  var obj = {
   email:"Marc.hypolite@gmail.com",
   name:"Marc Hypolite",
   profilePicture:"NULL",
   uid: user.uid
  };
 this.firebaseService.create_record(obj,"Users");
 alert("done")
}

getarray(uid){
  var friends;
  var id;
  this.firebaseService.get_where("Users","uid",uid).subscribe(res => {
    var Arr = res;
    var obj = Arr[0].data;
    id = Arr[0].id
    if(!obj.friends){
    this.firebaseService.update_collection("Users",Arr[0].id,{friends:[]});
    }
      friends = obj.friends;
  })

  return {id:id,friends:friends}
}

get_recordID(uid){
  this.firebaseService.get_where("Users","uid",uid).subscribe(res => {
    var Arr = res;
    return Arr[0].id
  })
}
}

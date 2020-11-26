import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Toast } from '@capacitor/core';
import { FirebaseService } from '../services/firebase.service';
import { FriendService } from '../services/Friend.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friendnames = [];
  userId;
  clicked = false;
  newfriends=[];
  friendid;
  currentUser;
  curr_chatid;
  constructor(private af:AngularFireAuth,private firebaseService: FirebaseService,private fs: FriendService, private afs: AngularFirestore) {   
   }

 ngOnInit() {
  }
async start(){
 // this.af.authState.subscribe( user => {
   // if (user) { this.userId = user.uid }
 // });
 console.log(this.userId);
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


//function called when add friend clicked
  async addfriend(friendemail){

    let user = await this.af.currentUser
    this.friendid = friendemail.value;
    this.curr_chatid = this.createchatid(user.uid,this.friendid);
  this.firebaseService.get_where("users","uid",friendemail.value).subscribe(res => {
      var Arr = res;
      
      this.check_if_exist(Arr);

      var friend = this.createfriend(Arr,this.curr_chatid);
//      this.set_self(user.uid,chatid,this.friendid);
      
//logs for debuging
      console.log("obj friend: ",friend);

      this.updatefile(friend,user.uid);
})

console.log("chattid e: ",this.curr_chatid);
//the input value cleared
    this.set_self(user.uid,this.curr_chatid,this.friendid);
    friendemail.value="";

  }

  check_if_exist(Arr){
if(Arr.length==0){
  alert("friend not found");
}
  }

createchatid(uid,other_uid){
  console.log("create: ",other_uid);
  var num = Math.floor((Math.random() * 999) + 1);
  var chatid = uid + other_uid + num;
  return chatid;
}
createfriend(Arr,chat){
  console.log("Arr: ",Arr);
  var friend ={
    name: Arr[0].data.name,
    uid: Arr[0].data.uid,
    chatid: chat
   };
   return friend;
}
set_self(uid,chat,other_uid){
  this.firebaseService.get_where("users","uid",uid).subscribe(res => {
    var Arr = res;
   
   var own ={
    name:Arr[0].data.name,
    uid: uid,
    chat:chat
  }
  this.add_to_others_list(other_uid,own);
   
  })

}
add_to_others_list(other_uid,own){
  console.log("to own: ",own);
  this.firebaseService.update_collection("users",other_uid,{'friends' : firestore.FieldValue.arrayUnion(own)});
  alert("friend added");
  return "finished"

}


  updatefile(newfriend,uid){
      console.log(newfriend)

      this.firebaseService.update_collection("users",uid,{'friends' : firestore.FieldValue.arrayUnion(newfriend)});
     alert("friend added");
     return "finished"
  }
  

  /*
  //testing functions
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
}*/
}

import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { Toast } from "@capacitor/core";
import { FriendService } from "../services/Friend.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from "firebase/app";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.page.html",
  styleUrls: ["./friends.page.scss"],
})
export class FriendsPage implements OnInit {
  friendnames = [];
  uid;
  clicked = false;
  newfriends = [];
  friendid;
  currentUser;
  curr_chatid;
  friends = []; //aaron function
  constructor(
    public router: Router,
    private af: AngularFireAuth,
    private firebaseService: FirebaseService,
    private fs: FriendService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {}

  // function called when chat button is clicked
  chatWith(event, chatId) {
    //console.log("Chat Id: ", chatId);
    if (chatId) {
      localStorage.setItem("link-chat-id", chatId);
      this.router.navigate(["firechat"]);
    }
  }

  async start() {
    // this.af.authState.subscribe( user => {
    // if (user) { this.uid = user.uid }
    // });
    console.log("uid: ", this.uid);
    //var friendnames = []
    //if(!this.clicked){
    let user = await this.af.currentUser;
    this.uid = user.uid;
    console.log("User: ", user);

    await this.firebaseService
      .get_where("Users", "uid", this.uid)
      .subscribe((res) => {
        console.log(res);
        var userData = res[0].data;
        console.log("userData: ", userData);
        console.log("friends: ", userData.friends);

        for (var friend of userData.friends) {
          this.friendnames.push(friend);
        }
      });
    console.log("friendships:\n", this.friendnames);
    //this.clicked=true;}
  }

  //function called when add friend clicked
  async addfriend(friendemail) {
    let user = await this.af.currentUser;
    this.friendid = friendemail.value;
    this.curr_chatid = this.createchatid(user.uid, this.friendid);
    this.firebaseService
      .get_where("Users", "uid", friendemail.value)
      .subscribe((res) => {
        var Arr = res;

        this.check_if_exist(Arr);

        var friend = this.createfriend(Arr, this.curr_chatid);
        //      this.set_self(user.uid,chatid,this.friendid);

        //logs for debuging
        console.log("obj friend: ", friend);

        this.updatefile(friend, user.uid);
      });

    console.log("chattid e: ", this.curr_chatid);
    //the input value cleared
    this.set_self(user.uid, this.curr_chatid, this.friendid);
    friendemail.value = "";
  }

  //Checks if the friend is found
  check_if_exist(Arr) {
    if (Arr.length == 0) {
      alert("friend not found");
    }
  }

  //Generates a chat id unique to your friend and you
  createchatid(uid, other_uid) {
    console.log("create: ", other_uid);
    var num = Math.floor(Math.random() * 999 + 1);
    var chatid = uid + other_uid + num;
    return chatid;
  }

  //Creates a friend object for friend
  createfriend(Arr, chat) {
    console.log("Arr: ", Arr);
    var friend = {
      name: Arr[0].data.name,
      uid: Arr[0].data.uid,
      chatid: chat,
    };
    return friend;
  }

  //creates a friend object for yourself
  set_self(uid, chat, other_uid) {
    this.firebaseService.get_where("Users", "uid", uid).subscribe((res) => {
      var Arr = res;

      var own = {
        name: Arr[0].data.name,
        uid: uid,
        chat: chat,
      };
      this.add_to_others_list(other_uid, own);
    });
  }

  //Updates the friend that you added friend's list
  add_to_others_list(other_uid, own) {
    console.log("to own: ", own);
    this.firebaseService.update_collection("Users", other_uid, {
      friends: firestore.FieldValue.arrayUnion(own),
    });
    alert("friend added");
    return "finished";
  }

  //Updates the friend array with a new friend 
  updatefile(newfriend, uid) {
    console.log(newfriend);

    this.firebaseService.update_collection("Users", uid, {
      friends: firestore.FieldValue.arrayUnion(newfriend),
    });
    alert("friend added");
    return "finished";
  }
}

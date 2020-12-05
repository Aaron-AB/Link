import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { User } from 'src/shared/User';
import { map, switchMap } from 'rxjs/operators';
//import { Message } from 'src/shared/Message';


export interface User {
  uid: string;
  email: string;
}
 
export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService{

  commonId = "messages";
  currentUser: User = null;

  users = [];
  messages: Observable<Message[]>;

  //Constructor fetches the auth state
  constructor(private firebaseService: FirebaseService,
              private af: AngularFireAuth,
              private afs: AngularFirestore) { 
            this.af.onAuthStateChanged((user) => {
              this.currentUser = user;
              //console.log(this.currentUser);   
            });

            this.getUsers().subscribe(data => {
              this.users = data;
            })
          }

  //Grabs all the possible users in the database
  getUsers() {
    return this.afs.collection('Users').valueChanges({idField: 'uid'}) as Observable<User[]>;
  }

  //Sets a common chatId
  setChatId(chatId) {
    this.commonId = chatId;
   console.log("chat id: ", this.commonId);
  }

  //Sends a message to the database
  addChatMessage(msg) {
    return this.afs.collection(this.commonId).add({ //replace "messages" with whatever chatid there is
      msg: msg,
      from: this.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  //Gets the uid that is receving your message
  getUserForMsg(msgFromId, users: User[]): string {
    for (let usr of users){
      if (usr.uid == msgFromId) {
        return usr.uid;
      }
    }
    return 'Deleted';
  }

  //Gets the chat messages from the shared collection based on chatID
  getChatMessages() {
    let users = [];
    return this.getUsers().pipe(
      switchMap((res: any) => {
        users = res;
        return this.afs.collection(this.commonId, ref => ref.orderBy('createdAt')).valueChanges() as Observable<Message[]>;
      }),
      map((messages: any) => {
        // Get the real name for each user
        for (let m of messages) {          
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }        
        return messages
      })
    )
  }

}
//users
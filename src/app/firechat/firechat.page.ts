import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from "../services/firebase.service";
import { ChatService } from "../services/chat.service";
import { IonContent } from '@ionic/angular';
import { Message } from 'src/shared/Message';

@Component({
  selector: 'app-firechat',
  templateUrl: './firechat.page.html',
  styleUrls: ['./firechat.page.scss'],
})
export class FirechatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: Observable<any[]>;
  newMsg = '';

  constructor(private firebaseService: FirebaseService, private chatService: ChatService) {}

  commonid = "1234"; 

  ngOnInit() {
    this.chatService.setChatId(localStorage.getItem("link-chat-id"));
   this.messages = this.chatService.getChatMessages();
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

}

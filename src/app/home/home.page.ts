"use strict";

import { Component, NgZone } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public app;
  public messages = [];
  public message: string;
  public messagesRef = null;

  constructor(public _zone: NgZone) {

    const firebaseConfig = {
      apiKey: "AIzaSyB-HEUlWiEtokt8uI0oS2aX-gxQXQpi1AQ",
      authDomain: "chat-9fcd5.firebaseapp.com",
      projectId: "chat-9fcd5",
      storageBucket: "chat-9fcd5.appspot.com",
      messagingSenderId: "433694011323",
      appId: "1:433694011323:web:8430616a7c6622c4851e9e"
    };

    initializeApp(firebaseConfig);

    const db = getDatabase();
    this.messagesRef = ref(db, 'messages');

    this.load();
  }

  public load() {
    onValue(this.messagesRef, async (snapshot) => {
      this.messages = snapshot.val();
    });
  }

  public send() {
    this.messages.push({ text: this.message, author: 'rafabrun2006' });
    set(this.messagesRef, this.messages);
    this.message = null;
  }
}

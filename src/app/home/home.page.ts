"use strict";

import { Component, NgZone } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, onChildChanged } from "firebase/database";
import { getFirestore, getDocs, collection, addDoc, onSnapshot } from "firebase/firestore"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public messages: Array<any>;
  public message: string;
  public messagesRef;
  public username;

  constructor(public _zone: NgZone, public loadingController: LoadingController) {

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

    this.username = localStorage.getItem('username');
    if (!this.username) {
      this.username = (new Date()).getTime();
      localStorage.setItem('username', String(this.username));
    }

    this.load();
  }

  public async load() {
    const loading = await this.loadingController.create({message: 'Carregando mensagens...'});
    loading.present();

    onValue(this.messagesRef, async (snapshot) => {
      this._zone.run(() => {
        this.messages = snapshot.val() ? snapshot.val() : [];
      });

      loading.dismiss();
    });
  }

  public send() {
    this.messages.push({ text: this.message, author: this.username });
    set(this.messagesRef, this.messages);
    this.message = null;
  }
}

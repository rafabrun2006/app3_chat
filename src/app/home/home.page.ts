"use strict";

import { Component, NgZone } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { getDatabase, ref, set, onValue } from "firebase/database";

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

    const db = getDatabase();
    this.messagesRef = ref(db, 'messages');

    this.username = localStorage.getItem('username');
    if (!this.username) {
      this.username = (new Date()).getTime();
      localStorage.setItem('username', String(this.username));
    }

    this.loadMessages();
  }

  public async loadMessages() {
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

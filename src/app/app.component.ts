import { Component } from '@angular/core';

import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    initializeApp({
      apiKey: "AIzaSyB-HEUlWiEtokt8uI0oS2aX-gxQXQpi1AQ",
      authDomain: "chat-9fcd5.firebaseapp.com",
      projectId: "chat-9fcd5",
      storageBucket: "chat-9fcd5.appspot.com",
      messagingSenderId: "433694011323",
      appId: "1:433694011323:web:8430616a7c6622c4851e9e"
    });
  }
}

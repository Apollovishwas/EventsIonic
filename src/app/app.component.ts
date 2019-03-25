import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD9jSvzjS12QlUDSCiwgNe3bSkcgJpAcEY',
  authDomain: 'tourism-6d395.firebaseapp.com',
  databaseURL: 'https://tourism-6d395.firebaseio.com',
  projectId: 'tourism-6d395',
  storageBucket: 'tourism-6d395.appspot.com',
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

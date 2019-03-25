import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageNo = 0;
  infos = [];
  ref = firebase.database().ref('infos/');

  constructor(private route: ActivatedRoute, public router: Router, public alertController: AlertController) {
    this.ref.on('value', resp => {
    console.log(snapshotToArray(resp));

      this.infos = [];
      this.infos = snapshotToArray(resp);
    });
  }

  edit(key) {
    this.router.navigate(['/edit/'+key]);
  }

  async delete(key) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this info?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            firebase.database().ref('infos/'+key).remove();
          }
        }
      ]
    });

    await alert.present();

  }

  getImage() {
console.log(this.imageNo);
    if(this.imageNo == 3){
      this.imageNo = 0;
    }
    //console.log("getImage Works");
    //console.log(this.infos[this.imageNo]["image"]);
    var res = this.infos[this.imageNo]["image"];
    this.imageNo = this.imageNo + 1;
    return res;
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      
      returnArr.push(item);
  });
 // var imag = document.getElementById('image');
  // always instatiate with a valid value
 // this.imageOf = returnArr[0]["image"];
  console.log();
  return returnArr;
}


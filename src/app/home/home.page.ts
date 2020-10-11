import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private fire: FirebaseService) {}

  createRec() {
    this.fire.create_record({'guy': 'Keronn', 'age': '20'}, 'Test')
  }



}

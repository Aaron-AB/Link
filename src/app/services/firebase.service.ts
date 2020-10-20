import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

//import { CropData } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  /*
  Current records in database:
  Users
  */

  collectionName;
  constructor(
    private firestore: AngularFirestore
  ) { }

  create_record(record,collectionName) {
    this.collectionName = collectionName;
    return this.firestore.collection<any>(collectionName).add(record);
  }

  read_record() { 
    return this.firestore.collection<any>(this.collectionName).valueChanges();
  }

  update_record(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_record(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  get_recent() {
    return this.firestore.collection<any>(this.collectionName, ref => ref.orderBy('Date', 'desc')).snapshotChanges();
  }
}

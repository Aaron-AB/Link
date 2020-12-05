import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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


  //Creates a record, in the firestore collection
  create_record(record, collectionName) {
    this.collectionName = collectionName;
    return this.firestore.collection<any>(collectionName).add(record);
  }

  //creates a record in the firestore collection where the inputted ID is the name of the document
  create_record_id(record, collectionName, userID) { 
    return this.firestore.doc(collectionName + '/' + userID).set(record);
  }

  //reads an entire collection
  read_record(collectionName) {
    return this.firestore.collection<any>(collectionName).snapshotChanges();
  }

  //Updates a record in a collection
  update_record(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record)
  }

  //Redundant code, might break something if i remove
  update_collection(collectionName,recordID, record) {
    this.firestore.doc(collectionName + '/' + recordID).update(record);
  }

  //Deletes a record in collection
  delete_record(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  //Fetches the most recently added items in a collection
  get_recent() {
    return this.firestore.collection<any>(this.collectionName, ref => ref.orderBy('Date', 'desc')).snapshotChanges();
  }

  //Fetches based on equality
  get_where(collectionName,key,value){
    return this.firestore.collection<any>(collectionName, ref => ref.where(key ,'==' , value)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return {
            //id: a.payload.doc.data().id,
            data: a.payload.doc.data()
          }
        })
      })
    );

  }

  //Gets 1 document from a collection
  getDoc(collectionName, docID) {
    this.firestore.collection<any>(collectionName).doc(docID).snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      const id = action.payload.id;
      console.log(data);
      return { data };
    }
    ));
  }

}

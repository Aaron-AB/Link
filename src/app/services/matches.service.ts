import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FirebaseService } from "./firebase.service";

@Injectable({
  providedIn: "root",
})
export class MatchesService {
  private posts = new Observable<any[]>();
  match;

  constructor(private firebaseService: FirebaseService) {
    // this.firebaseService.read_record("Users").subscribe(data => {

    //   this.posts = data.map(e => {

    //     return {
    //       //id: e.payload.doc.id,
    //       Name: e.payload.doc.data()['name'],
    //       Email: e.payload.doc.data()['email'],
    //       ProfilePicture: e.payload.doc.data()['profilePicture'],
    //     };

    //   })
    //   //console.log(this.posts);
    //  });

    this.posts = this.firebaseService.read_record("Users").pipe(
      map((actions) => {
        return actions.map((a) => {
          return {
            id: a.payload.doc.id,
            Name: a.payload.doc.data()["name"],
            Email: a.payload.doc.data()["email"],
            ProfilePicture: a.payload.doc.data()["profilePicture"],
          };
        });
      })
    );

    console.log(this.posts);
  }

  getProductsArr() {
    return this.posts;
  }

  addMatch(match) {
    this.match = match;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FirebaseService } from 'src/app/services/firebase.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber;
  pNumber;

  constructor(
    //public authService: AuthenticationServiceService,
    public router: Router,
    public af: AngularFireAuth,
    public fireServ: FirebaseService
  ) { }

  ngOnInit() {
    //firebase.initializeApp(environment.firebase);
    this.recaptchaVerifier = new firebase.auth.
      RecaptchaVerifier('recaptcha-container', { 'size': 'invisible'});
  }

  sendOTP() {
    var areaCode ="+1868";
    var pNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    pNumber = areaCode + pNumber;
    console.log(pNumber);
    this.pNumber = pNumber;

    this.af.signInWithPhoneNumber(this.pNumber, this.recaptchaVerifier).then((result) => {
    this.otpSent = true;
    this.phoneNumber = pNumber;
    this.confirmationResult = result;
    alert("OTP Sent!");
  }).catch(err => {
    alert(err);
  })

  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;
    document.title = "Verify your number";
    this.confirmationResult.confirm(otp).then((result) => {
      //console.log(this.af.currentUser);
      let user = result.user;
      let userObj = {userid: user.uid}
      this.fireServ.create_record_id(userObj, 'Users', user.uid); 
      this.router.navigate(['login/swiper']);
      alert("OTP Verified!");
    }).catch(err => {
      alert(err);
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from '../services/firebase-login.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  username: string = ""
  password: string = ""
  email: string = ""

  constructor(private router: Router, public alert: ToastController, private firebaseLoginService: FirebaseLoginService, private storage: Storage) { }

  redirectHome() {
    this.router.navigate(['/tabs/home']);
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }

  async missingInputsToast() {
    const alert = await this.alert.create({
      message: 'Missing inputs',
      duration: 2000,
      icon: 'sad'
    });
    await alert.present();
  }

  async usernameErrorToast() {
    const alert = await this.alert.create({
      message: 'Username cannot contain more than 25 characters',
      duration: 4000,
      icon: 'sad'
    });
    await alert.present();
  }

  async emailErrorToast() {
    const alert = await this.alert.create({
      message: 'Please enter a valid email',
      duration: 4000,
      icon: 'sad'
    });
    await alert.present();
  }

  async passwordLenghtErrorToast() {
    const alert = await this.alert.create({
      message: 'Password must be at least 10 characters long',
      duration: 4000,
      icon: 'sad'
    });
    await alert.present();
  }

  async passwordContentsErrorToast() {
    const alert = await this.alert.create({
      message: 'Password must have a combination of numbers & letters',
      duration: 4000,
      icon: 'sad'
    });
    await alert.present();
  }

  async invalidCredentialsToast() {
    const alert = await this.alert.create({
      message: 'Invalid Credentials',
      duration: 3000,
      icon: 'sad'
    });
    await alert.present();
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  }

  register() {
    if (this.username.trim() === "") {
      console.log("Missing username");
      this.missingInputsToast();
    } else if (this.password.trim() === "") {
      console.log("Missing password");
      this.missingInputsToast();
    } else if (this.email.trim() === "") {
      console.log("Missing email");
      this.missingInputsToast();
    } else if (this.username.length > 25) {
      console.log("Username too long");
      this.usernameErrorToast();
    } else if (!this.validateEmail(this.email)) {
      console.log("Invalid email");
      this.emailErrorToast();
    } else if (this.password.length < 10) {
      console.log("Password too short");
      this.passwordLenghtErrorToast();
    } else if (!this.validatePassword(this.password)) {
      console.log("Password does not meet requirements");
      this.passwordContentsErrorToast();
    } else {
      this.firebaseLoginService.createUser(this.email, this.password, this.username)
        .then(userCredential => {
          this.storage.set("SessionID", true)
          console.log("User signed up successfully", userCredential);
        })
        .catch(error => {
          console.error("Error during sign up", error);
          this.invalidCredentialsToast();
        });
      console.log("User registered successfully");
      this.redirectHome();
    }
  }


  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(private router: Router, public alert: ToastController) { }

  redirectHome() {
    this.router.navigate(['/tabs/home']);
  }

  redirectSignup() {
    this.router.navigate(['/signup']);
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

  logIn() {
    if (this.username.trim() === "") {
      console.log("Missing username");
      this.missingInputsToast();
    } else if (this.password.trim() === "") {
      console.log("Missing password");
      this.missingInputsToast();
    } else if (this.username.length > 25) {
      console.log("Username too long")
      this.usernameErrorToast()
    }
    else {
      console.log("User logged in succesfully")
      this.redirectHome()
    }
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/my-service.service';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from '../services/firebase-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string = ""

  constructor(private router: Router, public alert: ToastController, private userService: UserService, private storage: Storage, private firebaseLoginService: FirebaseLoginService
  ) { }

  redirectSignup() {
    this.router.navigate(['/signup']);
  }

  redirectHome() {
    this.router.navigate(['tabs/home']);
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async missingInputsToast() {
    const alert = await this.alert.create({
      message: 'Missing inputs',
      duration: 2000,
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

  async emailErrorToast() {
    const alert = await this.alert.create({
      message: 'Please enter a valid email',
      duration: 4000,
      icon: 'sad'
    });
    await alert.present();
  }

  async logIn() {
    if (this.email.trim() === "") {
      console.log("Missing email");
      await this.missingInputsToast();
    } else if (this.password.trim() === "") {
      console.log("Missing password");
      await this.missingInputsToast();
    } else if (!this.validateEmail(this.email)) {
      console.log("Invalid email")
      await this.emailErrorToast()
    }
    else {
      this.firebaseLoginService.login(this.email, this.password)
        .then(userCredential => {
          console.log("User logged in successfully", userCredential);
          this.redirectHome();
        })
        .catch(error => {
          console.error("Error during login", error);
          this.invalidCredentialsToast();
        });
    }
  }

  ngOnInit() {
  }

}

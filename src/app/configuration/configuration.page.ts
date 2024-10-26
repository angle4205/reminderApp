import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from '../services/firebase-login.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {
  email: string | null = null;
  constructor(private firebaseLoginService: FirebaseLoginService) { }

  async ngOnInit() {
    this.email = await this.firebaseLoginService.getCurrentUserEmail();
  }

  logOut() {
    this.firebaseLoginService.logOut()
  }

  resetPassword() {
    if (this.email) {
      this.firebaseLoginService.resetPassword(this.email);
    } else {
      console.error("Email not available for password reset");
    }
  }

}

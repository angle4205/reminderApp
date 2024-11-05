import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from '../services/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {
  email: string | null = null;
  constructor(private firebaseLoginService: FirebaseLoginService, private storage: Storage) { }

  async ngOnInit() {
    this.email = await this.firebaseLoginService.getCurrentUserEmail();
  }

  logOut() {
    this.storage.set("SessionID", false)
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

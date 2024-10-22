import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from '../services/firebase-login.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  constructor(private firebaseLoginService: FirebaseLoginService ) { }

  ngOnInit() {
  }

  logOut() {
    this.firebaseLoginService.logout()
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseLoginService } from './firebase-login.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private firestore: AngularFirestore, private authService: FirebaseLoginService, private afAuth: AngularFireAuth) {
    this.afAuth.setPersistence('local');
  }

  async addLocation(Location: any) {
    const userId = await this.authService.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');
    return this.firestore.collection(`users/${userId}/location`).add(Location);
  }

  async getLocation(): Promise<Observable<any[]>> {
    const userId = await this.authService.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');
    return this.firestore.collection(`users/${userId}/location`).valueChanges() as Observable<any[]>;
  }
}
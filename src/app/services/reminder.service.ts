import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseLoginService } from './firebase-login.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  constructor(private firestore: AngularFirestore, private authService: FirebaseLoginService, private afAuth: AngularFireAuth) {
    this.afAuth.setPersistence('local');
  }

  async addReminder(reminder: any) {
    const userId = await this.authService.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');
    return this.firestore.collection(`users/${userId}/reminders`).add(reminder);
  }

  async getReminders(): Promise<Observable<any[]>> {
    const userId = await this.authService.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');
    return this.firestore.collection(`users/${userId}/reminders`).valueChanges() as Observable<any[]>;
  }
}
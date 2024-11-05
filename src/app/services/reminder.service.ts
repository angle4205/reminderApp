import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseLoginService } from './firebase-login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  constructor(
    private firestore: AngularFirestore, 
    private authService: FirebaseLoginService
  ) {}

  async addReminder(reminder: any) {
    const userId = await this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');
    return this.firestore.collection(`users/${userId}/reminders`).add(reminder);
  }

  async getReminders(): Promise<Observable<any[]>> {
    const userId = await this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');
    return this.firestore.collection(`users/${userId}/reminders`).valueChanges() as Observable<any[]>;
  }
}
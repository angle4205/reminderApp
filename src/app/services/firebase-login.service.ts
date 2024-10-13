import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error during log-out", error);
      throw error;
    }
  }

  async create_user(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;

      if (!uid) {
        throw new Error("Failed to create user UID");
      }

      await this.firestore.doc(`users/${uid}`).set({
        email: email,
        uid: uid
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }
}

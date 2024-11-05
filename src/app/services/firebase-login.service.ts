import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  async logIn(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async logOut() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/login']);
      console.log("User logged out successfully")
    } catch (error) {
      console.error("Error during log-out", error);
      throw error;
    }
  }

  async createUser(email: string, password: string, username: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;
      const user = username;

      await this.firestore.doc(`users/${uid}`).set({
        email: email,
        username: user,
        uid: uid
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Task to database logic
  /* async createTask(task: Array<any>) {
    try {
      const userCredential = await this.afAuth.currentUser;
      const uid = userCredential.user?.uid;
      const userTask = task;

      await this.firestore.doc(`tasks/${uid}`).set({

      });

    } catch (error) {
      throw error
    }
  } */

  async resetPassword(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email)
  }

  async getCurrentUserEmail(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.email : null;
  }
  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }
}
import { inject, Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  isProcessing = signal<boolean>(true)
  private router = inject(Router)

  constructor() {
    this.user$.subscribe((user) => {
      this.isProcessing.set(false)
      if (user) {
        this.router.navigate(['/todo/app']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  onLogin(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/todo/app']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('error code: ', errorCode);
        console.error('error message: ', errorMessage);
      });
  }

  onLogout() {
    this.auth.signOut().then(() => {
      console.log('sign out success')
    }).catch((error) => {
      console.error('sign out error: ', error)
    })
  }

}

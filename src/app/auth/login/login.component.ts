import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GuardService } from '../guard.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth: Auth = inject(Auth);
  private authService= inject(GuardService);
  emailPasswordLogin(email: string, password: string) {
   this.authService.onLogin(email, password)
  }

  signOut() {
    this.auth.signOut().then(() => {
      console.log('sign out success')
    }).catch((error) => {
      console.error('sign out error: ',error)
    })
  }

}

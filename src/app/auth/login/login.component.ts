import { Component, inject } from '@angular/core';
import { GuardService } from '../guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService= inject(GuardService);
  private route = inject(Router)
  constructor(){
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.route.navigate(['/todo/app']);
      }
    })
  }
  
  emailPasswordLogin(email: string, password: string) {
   this.authService.onLogin(email, password)
  }
}

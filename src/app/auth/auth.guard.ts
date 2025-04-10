import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from './guard.service';

export const authGuard: CanActivateFn = (route, state) => {
  const guardService = inject(GuardService);
  return new Promise((resolve) => {
    guardService.user$.subscribe((user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

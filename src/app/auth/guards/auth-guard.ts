import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth)
  const router = inject(Router)

  if(authService.isLoggedIn()) return true
    
  localStorage.removeItem("tjwt")
  localStorage.removeItem("email")
  localStorage.removeItem("userId")
  localStorage.removeItem("nameUser")
  return router.createUrlTree(['/auth/login'])

};

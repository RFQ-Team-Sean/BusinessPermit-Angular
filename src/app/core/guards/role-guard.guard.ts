// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class roleGuard implements CanActivate {

  constructor(private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Get the expected role from route data
    const expectedRole = route.data['expectedRole'];

    // Get the current user's role from localStorage
    const userRole = localStorage.getItem('userRole');

    // Check if the user role exists and matches the expected role(s)
    if (userRole && expectedRole.includes(userRole)) {
      return true;
    } else {
      // Redirect to unauthorized or login page if roles do not match
      this.router.navigate(['/login']);
      return false;
    }
  }
}

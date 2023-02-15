import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = this.localStorageService.getLocalStorage('userRole');
    let userRoleName = route.data['userRole'];

    if (userRole) {
      return true;
    } else {
      console.log('no Value');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

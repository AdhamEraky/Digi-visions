import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  public isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  public logout(): Observable<boolean> {
    this.localStorageService.deleteLocalStorage('userRole');
    this.router.navigateByUrl('/login');
    this.isLogged$.next(false);
    return of(true);
  }
}

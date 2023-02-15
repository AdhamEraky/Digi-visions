import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showCategories: boolean = false;
  showProducts: boolean = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let userRole = this.localStorageService.getLocalStorage('userRole');
    if (userRole == 'user') {
      this.showCategories = true;
      this.showProducts = false;
    } else if (userRole == 'admin') {
      this.showCategories = false;
      this.showProducts = true;
    }
  }

  logout() {
    this.authService.logout();
  }
}

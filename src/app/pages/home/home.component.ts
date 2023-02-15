import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showCategories: boolean = false;
  showProducts: boolean = false;
  userRoleName: any;
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    let userRole = this.localStorageService.getLocalStorage('userRole');
    this.userRoleName = this.localStorageService.getLocalStorage('userRole');
    if (userRole == 'user') {
      this.showCategories = true;
      this.showProducts = false;
    } else if (userRole == 'admin') {
      this.showCategories = false;
      this.showProducts = true;
    }
  }
}

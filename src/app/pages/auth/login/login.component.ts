import { NotificationService } from './../../../shared/services/notification.service';
import { AuthService } from './../../../core/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitLoading!: boolean;

  credentials = {
    user: {
      username: 'user',
      password: 'user',
      role: 'user',
    },
    admin: {
      username: 'admin',
      password: 'admin',
      role: 'admin',
    },
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.submitLoading = true;
      const { username, password } = this.loginForm.value;

      if (
        username == this.credentials.user.username &&
        password == this.credentials.user.password
      ) {
        localStorage.setItem('userRole', this.credentials.user.role);
        this.router.navigate(['/']);
        this.notify.success('Welcome User, You are logged in successfully');
        this.submitLoading = false;
      } else if (
        username == this.credentials.admin.username &&
        password == this.credentials.admin.password
      ) {
        localStorage.setItem('userRole', this.credentials.admin.role);
        this.router.navigate(['/']);
        this.notify.success('Welcome Admin, You are logged in successfully');
        this.submitLoading = false;
      } else {
        this.notify.error('Invalid credentials');
        this.submitLoading = false;
      }

      // this.authService.login(username, password).subscribe({
      //   next: () => {
      //     this.router.navigate(['/']);
      //     this.notify.success('Welcome, You are logged in successfully');
      //   },
      //   error: (err) => {
      //     this.notify.error(err);
      //     this.submitLoading = false;
      //   },
      // });
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}

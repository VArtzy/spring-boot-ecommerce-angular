import { Component, OnInit, inject } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;
  username = '';

  ngOnInit(): void {
    this.oidcSecurityService
    .checkAuth()
    .subscribe((loginResponse: LoginResponse) => {
      const { isAuthenticated, userData } = loginResponse;

      this.isAuthenticated = isAuthenticated;
      if (userData) {
        this.username= userData.preferred_username;
      }
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
    private userService: UserService) { }

  private loggedInSub!: Subscription;

  isUserAdmin: boolean = false;
  showNavigation: boolean = false;

  ngOnInit(): void {
    this.isUserAdmin = this.isAdmin();
    this.showNavigation = this.showNav();
    this.loggedInSub = this.authService.loggedIn.subscribe({
      next: (sub: boolean) => {
        this.showNavigation = sub;
      }
    })
  }

  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe();
  }
  logout() {
    this.authService.doLogout();
  }

  showNav() {
    return this.authService.isLoggedIn;
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

}

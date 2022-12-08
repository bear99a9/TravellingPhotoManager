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

  isUserAdmin: boolean = false;
  isLoggedIn: boolean = false;
  private isLoggedInSub!: Subscription;
  navbarOpen = false;


  ngOnInit(): void {
    this.isLoggedInSub = this.authService.loggedIn.subscribe((loggedIn: boolean) => {
      this.isUserAdmin = this.isAdmin();
      this.isLoggedIn = loggedIn;
    });
    this.isUserAdmin = this.isAdmin();
    this.isLoggedIn = this.loginStatus();
  }
  
  ngOnDestroy(): void {
    this.isLoggedInSub.unsubscribe();
  }

  logout() {
    this.authService.doLogout();
  }

  loginStatus(){
    return this.authService.isLoggedIn;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAdmin(){
    return this.userService.isAdmin();
  }

}

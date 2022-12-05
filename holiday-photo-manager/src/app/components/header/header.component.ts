import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private userService: UserService) { }

  isUserAdmin: boolean = false;

  ngOnInit(): void {
    this.isUserAdmin = this.isAdmin();
  }
  
  logout() {
    this.authService.doLogout();
  }

  showNav(){
    return this.authService.isLoggedIn;
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAdmin(){
    return this.userService.isAdmin();
  }

}

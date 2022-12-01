import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) { }
  title = 'holiday-photo-manager';

  logout() {
    this.authService.doLogout();
  }

  showLogout(){
    return this.authService.isLoggedIn;
  }
}

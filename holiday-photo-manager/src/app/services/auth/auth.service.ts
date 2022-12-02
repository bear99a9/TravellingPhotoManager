import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { BaseService } from '../base/base.service';
import { environment } from '../../../environments/environment.prod';
import ServiceResponse from '../../shared/models/service-response.interface';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from '../../shared/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private apiUrl: string = environment.apiUrl;
  private helper = new JwtHelperService();

  currentUser = {};
  constructor(private http: HttpClient,
    public router: Router,
    private userService: UserService) { super() }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<ServiceResponse>(`${this.apiUrl}auth/Login`, user, this.prepareOptions()).pipe(
        map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
        catchError(
          this.handleError()
        ))
      .subscribe((res: ServiceResponse) => {
        localStorage.setItem('access_token', res.data);
        const decodeJWT = this.helper.decodeToken(res.data);
        const user : User = {
          name: decodeJWT.name,
          role: decodeJWT.role,
          email: decodeJWT.email,
          id: +decodeJWT.id,
          password: ''
        }

        this.userService.setUserHash(user);

        this.router.navigate(['home/']);
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.clear();
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

}
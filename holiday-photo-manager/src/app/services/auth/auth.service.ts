import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { BaseService } from '../base/base.service';
import { environment } from '../../../environments/environment.prod';
import ServiceResponse from '../../shared/models/service-response.interface';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from '../user/user.service';
import { ErrorModalService } from '../error/error-modal.service';
import { Subject } from 'rxjs';
import { UserRequestPasswordReset } from '../../shared/models/UserRequestPasswordReset.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private apiUrl: string = environment.apiUrl;
  private helper = new JwtHelperService();

  loggedIn = new Subject<boolean>();

  currentUser = {};
  constructor(private http: HttpClient,
    public router: Router,
    private userService: UserService,
    private errorModalService: ErrorModalService ) { super() }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<ServiceResponse>(`${this.apiUrl}auth/Login`, user, this.prepareOptions()).pipe(
        map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
        catchError(
          this.handleError()
        ))
      .subscribe({
        next: (res: ServiceResponse) => {
          localStorage.setItem('access_token', res.data);
          const decodeJWT = this.helper.decodeToken(res.data);
          const user: User = {
            name: decodeJWT.name,
            role: decodeJWT.role,
            email: decodeJWT.email,
            id: +decodeJWT.id,
            password: ''
          }

          this.userService.setUserHash(user);
          this.router.navigate(['home/']);
          debugger
          this.loggedIn.next(true);
        },
        error: (error: any) => {
          this.errorModalService.show(error.message, error);
        },
        complete() {
        }
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
      this.loggedIn.next(false);
      this.router.navigate(['log-in']);
    }
  }

  requestPasswordReset(userRequestPasswordReset: UserRequestPasswordReset){
    this.http
    .post<ServiceResponse>(`${this.apiUrl}auth/password-reset-request`, userRequestPasswordReset, this.prepareOptions()).pipe(
      map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
      catchError(
        this.handleError()
      ))
    .subscribe({
      next: (res: ServiceResponse) => {
        const title = res.success ? 'Email Reset Sent' : 'Email Not Found';

        return this.errorModalService.show(res.message, res, title);
      },
      error: (error: any) => {
        this.errorModalService.show(error.message, error);
      },
      complete() {
      }
    });

  }

  passwordReset(passwordReset: any){
    this.http
    .post<ServiceResponse>(`${this.apiUrl}auth/reset-password`, passwordReset, this.prepareOptions()).pipe(
      map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
      catchError(
        this.handleError()
      ))
    .subscribe({
      next: (res: ServiceResponse) => {
        const title = res.success ? 'Email Reset' : 'Link Expired';

        this.errorModalService.show(res.message, res, title);
        this.router.navigate(['log-in']);
      },
      error: (error: any) => {
        this.errorModalService.show(error.message, error);
      },
      complete() {
      }
    });

  }


}
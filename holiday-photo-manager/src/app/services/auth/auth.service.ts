import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/user.model';
import { BaseService } from '../base/base.service';
import { environment } from '../../../environments/environment.prod';
import ServiceResponse from '../../models/service-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private apiUrl: string = environment.apiUrl;

  currentUser = {};
  constructor(private http: HttpClient,
    public router: Router) { super() }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<ServiceResponse>(`${this.apiUrl}/Login`, user, this.prepareOptions()).pipe(
        map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
        catchError(
          this.handleError()
        ))
      .subscribe((res: ServiceResponse) => {
        localStorage.setItem('access_token', res.data);
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
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

}
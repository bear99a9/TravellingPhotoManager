import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/shared/models/user.model';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public setUserHash(user: any): void {
    let hash = this.encryptData(user);
    localStorage.setItem('h', hash);
  }

  public getUserHash() {
    const hashedUser = localStorage.getItem('h');
    if (hashedUser) {
      return this.decryptData(hashedUser);
    }
    else{
      const user: User  = {role: 'Guest', id: 0, name: '', email: '', password: '' };
      return user;
    }
  }
  public isAdmin() {
    const user = this.getUserHash();
    return user.role === 'Admin';
  }

  private encryptData(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), environment.hashSalt).toString();
  }

  private decryptData(data: any) {

    const bytes = CryptoJS.AES.decrypt(data, environment.hashSalt);

    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return data;
  }

}

import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public setUserHash(user: any): void {
    let hash = this.encryptData(user);
    localStorage.set('h', hash);
  }

  public getUserHash() {
    const hashedUser = localStorage.getItem('h');

    let user = this.decryptData(hashedUser);

    return user;
  }

  private encryptData(data: any) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.hashSalt).toString();
    } catch (e) {
      console.log(e);
    }
  }

  private decryptData(data: any) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.hashSalt);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

}

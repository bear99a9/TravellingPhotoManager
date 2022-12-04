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
    localStorage.setItem('h', hash);
  }

  public getUserHash() {
    const hashedUser = localStorage.getItem('h');
    return this.decryptData(hashedUser);
  }
  public isAdmin(){
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

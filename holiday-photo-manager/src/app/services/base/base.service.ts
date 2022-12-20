import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  public prepareFormOptions(): any {
    return { headers: new HttpHeaders(), responseType: 'json', observe: 'response' };
  }

  public prepareOptions(): any {
    let httpHeaders = new HttpHeaders();

    httpHeaders = httpHeaders
      .set('Content-Type', 'application/json')

    return { headers: httpHeaders, responseType: 'json', observe: 'response' };
  }



  public processResponse(data: any) {
    if (data.status === 299) {
      throw {
        message: data.body,
        status: data.status,
        isValidationError: true
      };
    } else if (data.name && data.name == "HttpErrorResponse") {
      throw {
        message: data.body,
        status: data.status,
        isValidationError: false
      };
    } else {
      return data.body;
    }
  }

  public handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      if (error.error && typeof error.error == "string") {
        throw {
          message: error.error,
          status: error.status
        };
      } else if (error.error && error.error.ClassName == "System.ComponentModel.DataAnnotations.ValidationException") {
        throw {
          message: error.error.Message,
          status: error.status
        };
      } else if (error.status === 299) {
        throw {
          message: error.message,
          status: error.status,
          isValidationError: true
        };
      }else if (error.status === 400) {
        throw {
          message: "Please enter the correct email and password combination",
          status: error.status,
          isValidationError: true
        };
      } else {
        throw {
          message: "Oops, an error has occurred. Looks like I did not do a good job there!",
          status: error.status
        };
      }
    };
  }
}

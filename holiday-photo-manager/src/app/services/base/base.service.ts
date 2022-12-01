import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

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
      console.log(error.status);
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
      } else {
        throw {
          message: "Oops, an error has occurred. If the error persists, please contact your local branch.",
          status: error.status
        };
      }
    };
  }
}
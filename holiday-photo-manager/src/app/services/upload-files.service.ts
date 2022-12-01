import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  SERVER_URL: string = "https://file.io";
  constructor(private httpClient: HttpClient) { }

  public upload(formData: any) {
    debugger;
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((data: any) => this.processResponse(data)),
      catchError(this.handleError()
    ));

  }

  public processResponse(data: any) {
    debugger;
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
      // if(environment.envName !== "prod") {
      //  console.error(`${operation} failed: ${error.message}`); // log to console
      // }
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

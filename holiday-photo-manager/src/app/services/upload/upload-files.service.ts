import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../../environments/environment.prod';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService extends BaseService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public upload(formData: any) {
    debugger;
    return this.httpClient.post(this.apiUrl + 'blog', formData).pipe(
      map((data: any) => this.processResponse(data)),
      catchError(this.handleError()
      ));
  }

}

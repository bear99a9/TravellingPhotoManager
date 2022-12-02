import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../../environments/environment.prod';
import ServiceResponse from '../../shared/models/service-response.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService {

  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { super() }

  public upload(formData: any) {

    return this.httpClient.post<ServiceResponse>(this.apiUrl + 'photo/upload-images', formData, this.prepareFormOptions() ).pipe(
      map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
      catchError(this.handleError()
    ));
  }

  public GetPhotos(){
    return this.httpClient.get<ServiceResponse>(this.apiUrl + 'photo/retrieve-all-images', this.prepareFormOptions() ).pipe(
      map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
      catchError(this.handleError()
    ));

  }

}

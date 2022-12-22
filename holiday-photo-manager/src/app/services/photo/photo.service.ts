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

  public upload(formData: any, type: number) {
    let urlEndPoint = '';
    
    if (type === 1) {
      urlEndPoint = 'photo/upload-images';
    } else {
      urlEndPoint = 'photo/upload-featured-images';
    }

    return this.httpClient.post<ServiceResponse>(this.apiUrl + urlEndPoint, formData, this.prepareFormOptions() ).pipe(
      map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
      catchError(this.handleError()
    ));
  }

  public FetchAllPhotos(){
    return this.httpClient.get<ServiceResponse>(this.apiUrl + 'photo/retrieve-all-images', this.prepareFormOptions() ).pipe(
      map((data: HttpEvent<ServiceResponse>) => this.processResponse(data)),
      catchError(this.handleError()
    ));
  }

  public FetchFeaturedPhotos(){
    return this.httpClient.get<ServiceResponse>(this.apiUrl + 'photo/retrieve-featured-images', this.prepareFormOptions() ).pipe(
      map((data: any) => this.processResponse(data)),
      catchError(this.handleError()
    ));
  }

  public FetchPhotosCoOrdinates(){
    debugger;
    return this.httpClient.get<ServiceResponse>(this.apiUrl + 'photo/retrieve-images-co-ordinates', this.prepareFormOptions() ).pipe(
      map((data: any) => { 
        debugger;
        this.processResponse(data);
      }),
      catchError(
        this.handleError()
    ));
  }

}

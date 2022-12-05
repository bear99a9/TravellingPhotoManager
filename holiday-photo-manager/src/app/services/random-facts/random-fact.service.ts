import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomFactService extends BaseService {

  constructor(private httpClient: HttpClient) { super() }

  public getQuote() {
    let headers =  new HttpHeaders();
    headers = headers.set('X-Api-Key', environment.apiNinjaKey);

    return this.httpClient.get('https://api.api-ninjas.com/v1/quotes?limit=1', { headers: headers, responseType: 'json', observe: 'response' } ).pipe(
      map((data: any) => this.processResponse(data)),
      catchError(this.handleError()
    ));
  }

}

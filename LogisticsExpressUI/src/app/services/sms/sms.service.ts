import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SMS } from 'src/app/modules/notification/sms';



@Injectable({
  providedIn: 'root'
})
export class SmsService {

  BaseURL = "http://localhost:5211/api/SMS"

  constructor(private http: HttpClient) { }

  sendSMS(sms: SMS): Observable<SMS>{
    return this.http.post<SMS>(this.BaseURL, sms);
  }

}

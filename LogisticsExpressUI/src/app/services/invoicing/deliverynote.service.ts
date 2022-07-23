import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryNote } from 'src/app/modules/invoicing/deliverynote.module';

@Injectable({
  providedIn: 'root'
})
export class DeliverynoteService {

  baseURL = '';
  constructor(private http: HttpClient) { }

  getAllDeliveryNotes(): Observable<DeliveryNote[]>{
    return this.http.get<DeliveryNote[]>(this.baseURL)
  }

  getDeliveryNote(id:number):Observable<DeliveryNote[]>{
    return this.http.get<DeliveryNote[]>(this.baseURL + '/'+id)
  }
}

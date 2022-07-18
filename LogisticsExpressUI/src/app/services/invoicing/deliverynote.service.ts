import { Injectable } from '@angular/core';
import { DeliveryNote } from 'src/app/modules/invoicing/deliverynote';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverynoteService {

  baseURL= '';
  constructor(private http: HttpClient) { }

  //GET DELIVERY NOTE
  getAllDeliveryNotes(): Observable<DeliveryNote[]>{
    return this.http.get<DeliveryNote[]>(this.baseURL)
  }

  //GET 1 DELIVERY NOTE 
  getDeliveryNote(id: number):Observable<DeliveryNote[]>{
    return this.http.get<DeliveryNote[]>(this.baseURL + '/'+ id)
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerContact } from 'src/app/modules/customercontacts/customercontacts.module';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactsService {

  baseUrl = 'https://localhost:7013/api/CustomerContacts'; 
  
  constructor(private http: HttpClient ) { }

  getAllContacts():Observable<CustomerContact[]>{
      return this.http.get<CustomerContact[]>(this.baseUrl)
  }
 
  getCustomerContacts(id: Number):Observable<CustomerContact[]>{
    return this.http.get<CustomerContact[]>(this.baseUrl + '/' + id)
  }

  addCustomerContact(contact: CustomerContact):Observable<CustomerContact>{
     return this.http.post<CustomerContact>(this.baseUrl,contact)
  }

  deleteCustomerContact(id:number):Observable<CustomerContact>{
     return this.http.delete<CustomerContact>(this.baseUrl + '/'+ id)
 }

  updateCustomerContact(contact: CustomerContact): Observable<CustomerContact>{
    return this.http.put<CustomerContact>(this.baseUrl + '/'+ contact.customerContactId, contact)
  }
}


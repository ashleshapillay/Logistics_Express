import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/modules/customers/customers.module';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = 'https://localhost:7013/api/Customers'

  constructor(private http: HttpClient) { }

  //Get All Customers
  getAllCustomers(): Observable<Customer[]>{
   return  this.http.get<Customer[]>(this.baseUrl)
  }

  //Add New Customers
  addCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(this.baseUrl,customer);
  }

  //Delete Customer
  deleteCustomer(id: Number): Observable<Customer>{
    return  this.http.delete<Customer>(this.baseUrl + '/'+ id);
  }

  //Update Customer
  updateCustomer(customer: Customer): Observable<Customer>{
    return  this.http.put<Customer>(this.baseUrl + '/'+ customer.customerId, customer);
  }

}

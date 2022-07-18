import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VAT } from 'src/app/modules/VAT/VAT.module';

@Injectable({
  providedIn: 'root'
})
export class VATService {

  //base URL's
  VATUrl = 'https://localhost:7056/api/VAT';

  constructor(private http: HttpClient) { }

       //get a VAT entry
       getVAT(id= 1):Observable<VAT[]>{
        return this.http.get<VAT[]>(this.VATUrl + '/' + id)
      }
      //Create VAT
      addVAT(vat:VAT):Observable<VAT>{
        return this.http.post<VAT>(this.VATUrl,vat);
      }
      //Edit VAT
      editVAT(vat: VAT): Observable<VAT>{
        return  this.http.put<VAT>(this.VATUrl + '/'+ vat.VATId, vat);
      }
}


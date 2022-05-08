import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcontractor } from 'src/app/modules/subcontractors/subcontractors.module';


@Injectable({
  providedIn: 'root'
})
export class SubcontractorsService {

  baseUrl ='https://localhost:7013/api/Subcontractors'
  
  constructor(private http: HttpClient) { }

  //Get All Subcontractors
  getAllSubcontractors(): Observable<Subcontractor[]>{
   return  this.http.get<Subcontractor[]>(this.baseUrl)
  }

  //Add New Subcontractors
  addSubcontractor(Subcontractor:Subcontractor):Observable<Subcontractor>{
    return this.http.post<Subcontractor>(this.baseUrl,Subcontractor);
  }

  //Delete Subcontractor
  deleteSubcontractor(id: Number): Observable<Subcontractor>{
    return  this.http.delete<Subcontractor>(this.baseUrl + '/'+ id);
  }

  //Update Subcontractor
  updateSubcontractor(Subcontractor: Subcontractor): Observable<Subcontractor>{
    return  this.http.put<Subcontractor>(this.baseUrl + '/'+ Subcontractor.subcontractorId, Subcontractor);
  }

}

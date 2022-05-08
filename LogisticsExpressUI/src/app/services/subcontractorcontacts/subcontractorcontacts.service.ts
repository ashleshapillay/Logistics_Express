import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubcontractorContact } from 'src/app/modules/subcontractorcontacts/subcontractorcontacts.module';


@Injectable({
  providedIn: 'root'
})
export class SubcontractorcontactsService {
 
  baseUrl ='https://localhost:44347/api/SubcontractorContacts'
 
  constructor(private http: HttpClient) { }

  getAllContacts():Observable<SubcontractorContact[]>{
    return this.http.get<SubcontractorContact[]>(this.baseUrl)
}

getSubcontractorContacts(id: Number):Observable<SubcontractorContact[]>{
  return this.http.get<SubcontractorContact[]>(this.baseUrl + '/' + id)
}

addSubcontractorContact(contact: SubcontractorContact):Observable<SubcontractorContact>{
   return this.http.post<SubcontractorContact>(this.baseUrl,contact)
}

deleteSubcontractorContact(id:number):Observable<SubcontractorContact>{
   return this.http.delete<SubcontractorContact>(this.baseUrl + '/'+ id)
}

updateSubcontractorContact(contact: SubcontractorContact): Observable<SubcontractorContact>{
  return this.http.put<SubcontractorContact>(this.baseUrl + '/'+ contact.subcontractorContactId, contact)
}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepairRequest } from 'src/app/modules/repairrequest/repairrequest.module';

@Injectable({
  providedIn: 'root'
})
export class RepairrequestserviceService {
//base URL's
  requestUrl = 'https://localhost:7009/api/RepairRequest';

  constructor(private http: HttpClient) { }
//REPAIR REQUEST
    //get all requests - WEB APPLICATION
    getAllRepairRequests(): Observable<RepairRequest[]>{
      return  this.http.get<RepairRequest[]>(this.requestUrl)
     }
     //get a single request - WEB APPLICATION
     getRepairRequest(id: Number):Observable<RepairRequest[]>{
      return this.http.get<RepairRequest[]>(this.requestUrl + '/' + id)
    }
    //add new request - MOBILE APPLICATION
    addRepairRequest(repairRequest:RepairRequest):Observable<RepairRequest>{
      return this.http.post<RepairRequest>(this.requestUrl,repairRequest);
    }
    //update a request
    updateRepairRequest(repairRequest:RepairRequest): Observable<RepairRequest>{
      return  this.http.put<RepairRequest>(this.requestUrl + '/'+ repairRequest.RepairRequestId, repairRequest);
    }
    //delete a request - WEB APPLICATION
    deleteRepairRequest(id: Number): Observable<RepairRequest>{
      return  this.http.delete<RepairRequest>(this.requestUrl + '/'+ id);
    }


}

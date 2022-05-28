import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fuel } from '../interfaces/fuel';
import { RepairRequest } from '../interfaces/repair-request';

@Injectable({
  providedIn: 'root'
})
export class MobileServicesService {

//base URL's
fuelUrl = 'https://localhost:7013/api/Fuel';
requestUrl = 'https://localhost:7013/api/RepairRequest';

  constructor(private http: HttpClient) { }

  //FUEL
    //get all fuel entries
    getAllFuelEntries(): Observable<Fuel[]>{
      return  this.http.get<Fuel[]>(this.fuelUrl)
     }
     //get a fuel entry
     getFuelEntry(id: Number):Observable<Fuel[]>{
      return this.http.get<Fuel[]>(this.fuelUrl + '/' + id)
    }
    //add fuel entry
    addFuelEntry(entry:Fuel):Observable<Fuel>{
      return this.http.post<Fuel>(this.fuelUrl,entry);
    }
    //update a fuel entry
    updateFuelEntry(entry:Fuel): Observable<Fuel>{
      return  this.http.put<Fuel>(this.fuelUrl + '/'+ entry.fuelEntryId, entry);
    }
    //delete a fuel entry
    deleteFuelEntry(id: Number): Observable<Fuel>{
      return  this.http.delete<Fuel>(this.fuelUrl + '/'+ id);
    }


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

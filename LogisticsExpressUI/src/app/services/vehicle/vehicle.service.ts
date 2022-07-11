import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/modules/vehicle/vehicle.model';
import { VehicleTypes } from 'src/app/modules/vehiclespecs/vehicletype.model';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseUrl!: 'https://localhost:7077/api/Vehicle';

  constructor(private http: HttpClient) { }

  //all vehicles
  getAllVehicles():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.baseUrl);
  }

  getVehicle(id:number):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.baseUrl+'/'+id)
  }

  //add new vehicle
  addVehicle(type: Vehicle):Observable<Vehicle>{
    return this.http.post<Vehicle>(this.baseUrl,type);
  }

  //update vehicle
  updateVehicle(type:Vehicle):Observable<Vehicle>{
    return this.http.put<Vehicle>(this.baseUrl + '/'+type.vehicleTypeID,type);
  }

  //delete vehicle
  deleteVehicle(id:number):Observable<Vehicle>{
    return this.http.delete<Vehicle>(this.baseUrl+'/'+id);
  }


}

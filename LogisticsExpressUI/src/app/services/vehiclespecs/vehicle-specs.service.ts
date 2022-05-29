import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleMakes } from 'src/app/modules/vehiclespecs/vehiclemake.model';
import { VehicleModels } from 'src/app/modules/vehiclespecs/vehiclemodel.model';
import { VehicleTypes } from 'src/app/modules/vehiclespecs/vehicletype.model';



@Injectable({
  providedIn: 'root'
})
export class VehicleSpecsService {

  //api link
  baseTypeUrl ='https://localhost:7013/api/VehicleType';
  baseMakeUrl = 'https://localhost:7013/api/VehicleMake';
  baseModelUrl = 'https://localhost:7013/api/VehicleModel';

  constructor(private http:HttpClient) { }

  //get vehicle type
  getAllTypes(): Observable<VehicleTypes[]> {
    return this.http.get<VehicleTypes[]>(this.baseTypeUrl);
  }

  
  // getType(id:number){
  // return this.http.get<VehicleType[]>(this.baseTypeUrl + '/' + id)

// }
  //add new vehicle type 
  addType(type:VehicleTypes): Observable<VehicleTypes>{
    return this.http.post<VehicleTypes>(this.baseTypeUrl, type);
  }

  //delete exisiting vehicle type
  deleteType(id:number):Observable<VehicleTypes>{
    return this.http.delete<VehicleTypes>(this.baseTypeUrl + '/' + id);

  }

  //get vehicle models
  getAllModel(): Observable<VehicleModels[]> {
    return this.http.get<VehicleModels[]>(this.baseModelUrl);
  }

  //add new vehicle model
  addModel(type: VehicleModels): Observable<VehicleModels> {
    return this.http.post<VehicleModels>(this.baseModelUrl, type);
  }

  //delete exisiting vehicle model
  deleteModel(id: number): Observable<VehicleModels> {
    return this.http.delete<VehicleModels>(this.baseModelUrl + '/' + id);

  }

  //get vehicle makes
  getAllMakes(): Observable<VehicleMakes[]> {
    return this.http.get<VehicleMakes[]>(this.baseMakeUrl);
  }

  //add new vehicle make
  addMake(type: VehicleMakes): Observable<VehicleMakes> {
    return this.http.post<VehicleMakes>(this.baseMakeUrl, type);
  }

  //delete exisiting vehicle make
  deleteMake(id: number): Observable<VehicleMakes> {
    return this.http.delete<VehicleMakes>(this.baseMakeUrl + '/' + id);

  }
}

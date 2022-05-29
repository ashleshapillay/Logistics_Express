import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleDriver } from 'src/app/modules/vehicle-driver/vehicle-driver.model';


@Injectable({
  providedIn: 'root'
})
export class VehicleDriverService {

  baseUrl!:'https://localhost:7077/api/VehicleDriver'

  constructor(private http: HttpClient) { }

  //get driver
  getDriver():Observable<VehicleDriver[]>{
    return this.http.get<VehicleDriver[]>(this.baseUrl)
  }

  //add driver
  addDriver(driver: VehicleDriver): Observable<VehicleDriver[]>{
    return this.http.post<VehicleDriver[]>(this.baseUrl,driver)
  }

  //update driver
  updateDriver(driver: VehicleDriver): Observable<VehicleDriver> {
    return this.http.put<VehicleDriver>(this.baseUrl + '/' + driver.VehicleDriverID, driver);
  }

  // delete driver
  deleteDriver(id: Number): Observable<VehicleDriver> {
    return this.http.delete<VehicleDriver>(this.baseUrl + '/' + id);
  }
}

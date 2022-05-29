import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverDetail } from 'src/app/modules/driverdetails/driverdetails';
import { Employee } from 'src/app/modules/employee/employee.module';
import { EmployeeRole } from 'src/app/modules/employeerole/employeerole.module';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSubService {

  //base URL's
  employeeUrl = 'https://localhost:7031/api/Employee';
  employeeroleUrl = 'https://localhost:7031/api/EmployeeRole';
  driverdetailUrl = 'https://localhost:7031/api/DriverDetails';

  constructor(private http: HttpClient) { }

  

    //get all countries
    getAllEmployees(): Observable<Employee[]>{ 
      return  this.http.get<Employee[]>(this.employeeUrl)
     }
     //get a single driverdetail
     getEmployee(id: Number):Observable<Employee>{
      return this.http.get<Employee>(this.employeeUrl + '/' + id)
    }
    //add new employee
    addEmployee(employee:Employee):Observable<Employee>{
      return this.http.post<Employee>(this.employeeUrl,employee);
    }
    //update a employee
    updateEmployee(employee: Employee): Observable<Employee>{
      return  this.http.put<Employee>(this.employeeUrl + '/'+ employee.employeeId, employee);
    }
    //delete an employee
    deleteEmployee(id: Number): Observable<Employee>{
      return  this.http.delete<Employee>(this.employeeUrl + '/'+ id);
    }


  //PROVINCE
    //get all provinces
    getAllRoles(): Observable<EmployeeRole[]>{
      return  this.http.get<EmployeeRole[]>(this.employeeroleUrl)
     }
     //get a single employeerole
     getRole(id: Number):Observable<EmployeeRole>{
      return this.http.get<EmployeeRole>(this.employeeroleUrl + '/' + id)
    }
    //add new employeerole
    addRole(employeerole:EmployeeRole):Observable<EmployeeRole>{
      return this.http.post<EmployeeRole>(this.employeeroleUrl,employeerole);
    }
    //update a employeerole
    updateRole(employeerole: EmployeeRole): Observable<EmployeeRole>{
      return  this.http.put<EmployeeRole>(this.employeeroleUrl + '/'+ employeerole.employeeRoleId, employeerole);
    }
    //delete a employeerole
    deleteRole(id: Number): Observable<EmployeeRole>{
      return  this.http.delete<EmployeeRole>(this.employeeroleUrl + '/'+ id);
    }


  //CITY
    //get all cities
    getAllDriverDetails(): Observable<DriverDetail[]>{
      return  this.http.get<DriverDetail[]>(this.driverdetailUrl)
     }
     //get a single driverdetail
     getDriverDetail(id: Number):Observable<DriverDetail>{
      return this.http.get<DriverDetail>(this.driverdetailUrl + '/' + id)
    }
    //add new driverdetail
    addDriverDetails(driverdetail:DriverDetail):Observable<DriverDetail>{
      return this.http.post<DriverDetail>(this.driverdetailUrl,driverdetail);
    }
    //update a driverdetail
    updateDriverDetails(driverdetail: DriverDetail): Observable<DriverDetail>{
      return  this.http.put<DriverDetail>(this.driverdetailUrl + '/'+ driverdetail.driverDetailsID, driverdetail);
    }
    //delete a driverdetail
    deleteDriverDetails(id: Number): Observable<DriverDetail>{
      return  this.http.delete<DriverDetail>(this.driverdetailUrl + '/'+ id);
    }



}

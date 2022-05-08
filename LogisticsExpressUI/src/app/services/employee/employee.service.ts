import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/modules/employee/employee.module';
import { EmployeeRole } from 'src/app/modules/employeerole/employeerole.module';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  employeeUrl ='https://localhost:7013/api/Employee'; 
  employeeRoleUrl = 'https://localhost:7013/api/EmployeeRole'; 

 
   //EMPLOYEE ROLE
  //get all employee roles
  getAllEmployeeRoles(): Observable<EmployeeRole[]>{
    return  this.http.get<EmployeeRole[]>(this.employeeRoleUrl)
   }
  //get a single employee role
  getEmployeeRole(id: Number):Observable<EmployeeRole[]>{
    return this.http.get<EmployeeRole[]>(this.employeeRoleUrl + '/' + id)
  }
  //add a new employee role
  addEmployeeRole(employeeRole:EmployeeRole):Observable<EmployeeRole>{
    return this.http.post<EmployeeRole>(this.employeeRoleUrl,employeeRole);
  }
  //update an employee role
  updateEmployeeRole(employeeRole: EmployeeRole): Observable<EmployeeRole>{
    return  this.http.put<EmployeeRole>(this.employeeRoleUrl + '/'+ employeeRole.EmployeeRoleId, employeeRole);
  }
  //delete an employee role
  deleteEmployeeRole(id: Number): Observable<EmployeeRole>{
    return  this.http.delete<EmployeeRole>(this.employeeRoleUrl + '/'+ id);
  }

  //EMPLOYEE
  //get all employees
  getAllEmployees(): Observable<Employee[]>{
    return  this.http.get<Employee[]>(this.employeeUrl)
   }
  //get a single employee
  getEmployee(id: Number):Observable<Employee[]>{
    return this.http.get<Employee[]>(this.employeeUrl + '/' + id)
  }
  //add a new employee
  addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.employeeUrl,employee);
  }
  //update an employee
  updateEmployee(employee: Employee): Observable<Employee>{
    return  this.http.put<Employee>(this.employeeUrl + '/'+ employee.EmployeeId, employee);
  }
  //delete an employee
  deleteEmployee(id: Number): Observable<Employee>{
    return  this.http.delete<Employee>(this.employeeUrl + '/'+ id);
  }
  

}

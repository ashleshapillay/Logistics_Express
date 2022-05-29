import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { EmailValidator, FormControl, Validators } from '@angular/forms';
import { DriverDetail } from 'src/app/modules/driverdetails/driverdetails';
import { Employee } from 'src/app/modules/employee/employee.module';
import { EmployeeRole } from 'src/app/modules/employeerole/employeerole.module';
import { EmployeeSubService } from 'src/app/services/employee/employee-sub.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns = ['firstName'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  AddDisabled = false;

  employeeroles: EmployeeRole[]= [];
  employeerole: EmployeeRole = {
    employeeRoleId: 0,
    employeeRoleDescription: '',
  }

  employees: Employee[] = [];
  employee: Employee = {
    employeeId: 0,
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    employeeRoleId: 0,
  }



  @Output() driverdetails: DriverDetail[] =[
    {
     DriverDetailsID: 0,
     LicenseNumber: '', 
     licenseExpirydate: '',
     licenseCode:'', 
     licenseCodeDescription: '',
     licenseCopy:'' ,
     employeeId: this.employee.employeeId
    }
  ];

 ViewEmployeeRole= false;
 ViewDriverDetails= false;
 AddView = false;

 constructor(private employeeSubService: EmployeeSubService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }
 
    openSnackBar() {
      this._snackBar.open(this.displayMessage, 'Close', {
        duration: 3000
      });
    }

 ngOnInit(): void {
   this.getAllEmployees();
   this.getAllRoles();
 }


 getAllEmployees() {
   this.employeeSubService.getAllEmployees()
     .subscribe(
       response => {
         this.employees = response;
       }
     )
  }

 addEmployee() {
  this.AddView=true;
  if (this.employee.firstName == "" || this.employee.surname || this.employee.email == "" || this.employee.phoneNumber == "" || this.employee.employeeRoleId==0){
       this.displayMessage = "Employee Details could not be added";
        this.openSnackBar();
  }
  else{
  this.employeeSubService.addEmployee(this.employee)
     .subscribe(
       response => {
         this.employee = {
           employeeId: 0,
           firstName: '',
           surname: '',
           email: '',
           phoneNumber: '',
           employeeRoleId:0,
          }
        
        this.displayMessage = "Employee Details Were Added Successfully";
        this.openSnackBar();
        this.getAllEmployees();
        this.EditView = false
        this.AddView = false
        window.location.reload()
       }
     )
  }

 };

 deleteEmployee(id: Number) {
   this.employeeSubService.deleteEmployee(id)
     .subscribe(
       response => {
        this.employee = {
          employeeId: 0,
          firstName: '',
          surname: '',
          email: '',
          phoneNumber: '',
          employeeRoleId:0,
         }

         this.getAllEmployees();
         this.displayMessage = "Employee Details Were Removed Successfully";
         this.openSnackBar();
         window.location.reload();
       }
     )
 };

 populateForm(employee: Employee){
   this.employee = employee; 
   this.isDisabled = false;
   this.AddDisabled = true; 
}

 updateEmployee(employee: Employee){
  if (this.employee.firstName == "" || this.employee.surname || this.employee.email == "" || this.employee.phoneNumber == ""|| this.employee.employeeRoleId==0){
    this.displayMessage = "Employee Details could not be updated";
     this.openSnackBar();
}
else{
   this.employeeSubService.updateEmployee(employee)
   .subscribe(
     response => {
        this.EditView = true;
        this.displayMessage = "Employee Details Were Updated Successfully";
        this.openSnackBar();
        window.location.reload();
     })
 }
}

getAllRoles(){
   this.employeeSubService.getAllRoles()
   .subscribe(
     response => {
         this.employeeroles = response;
          console.log(response);
       }
   )
 }

 
 UpdatePage(){
      this.AddView = false;
      this.EditView = true; 
 }



 AddPage(){
  this.AddView = true; 
  this.employee = {
    employeeId: 0,
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    employeeRoleId:0,
   }
   this.EditView=false;
}

  //Navigation
  EmployeeClick(){
    this.router.navigate(["employee"]);
  }
  EmployeeRoleClick(){
    this.router.navigate(["employeerole"]);
  }
  DriverDetailsClick(){
    this.router.navigate(["driverdetails"]);
  }
  
}

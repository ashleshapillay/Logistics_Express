import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { EmailValidator, FormControl, Validators } from '@angular/forms';
import { DriverDetail } from 'src/app/modules/driverdetails/driverdetails';
import { Employee } from 'src/app/modules/employee/employee.module';
import { EmployeeRole } from 'src/app/modules/employeerole/employeerole.module';
import { EmployeeSubService } from 'src/app/services/employee/employee-sub.service';

interface EmployeeType {
  value: string;
  viewValue: string;
}

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
  /*employeetypes: EmployeeType[] = [
    {value: 'driver-0', viewValue: 'Driver'},
    {value: 'administrator-1', viewValue: 'Administrator'},
  ];*/
  
  searchTerm='';
  term = '';

  employeeroles: EmployeeRole[] = [];
  employeerole: EmployeeRole = {
    employeeRoleId: 0,
    employeeRoleDescription: '',
  }

  employeeType:boolean=false;

  employees: Employee[] = [];
  employee: Employee = {
    employeeId: 0,
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    employeeRoleId: 0,
  }

  driverdetails: DriverDetail[] = []
  driverdetail: DriverDetail = {
    driverDetailsID: 0,
    LicenseNumber: '',
    LicenseCopy : '',
    LicenseExpirydate: '',
    LicenseCode: '',
    LicenseCodeDescription:'',
    employeeId:0
  
  }

 /*@Output() driverdetail: DriverDetail[] =[
    {
     driverDetailsID: 0,
     LicenseNumber: '', 
     LicenseExpirydate: '',
     LicenseCode:'', 
     LicenseCodeDescription: '',
     LicenseCopy:'' ,
     employeeId: this.employee.employeeId
    }
  ]*/

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
toogleTag(){
  this.employeeType=!this.employeeType
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
  if (this.employee.firstName == "" || this.employee.surname == "" || this.employee.email == "" || this.employee.phoneNumber == "" || this.employee.employeeRoleId==0){
       this.displayMessage = "Employee Details Could Not Be Added";
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
       }
     )
 };

 populateForm(employee: Employee){
   this.employee = employee; 
   this.isDisabled = false;
}

 updateEmployee(employee: Employee){
  if (this.employee.firstName == "" || this.employee.surname == ""|| this.employee.email == "" || this.employee.phoneNumber == ""|| this.employee.employeeRoleId==0){
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
}

getAllDriverDetails() {
  this.employeeSubService.getAllDriverDetails()
    .subscribe(
      response => {
        this.driverdetails = response;
      }
    )
 }

 addDriverDetails() {
  if (this.driverdetail.LicenseNumber == "" || this.driverdetail.LicenseExpirydate == "" || this.driverdetail.LicenseCode == "" || this.driverdetail.LicenseCodeDescription == ""|| this.driverdetail.LicenseCopy == "" || this.driverdetail.employeeId == 0){
       this.displayMessage = "Driver Details were unsuccessfully created";
        this.openSnackBar();

}
else{
  this.employeeSubService.addDriverDetails(this.driverdetail)
  .subscribe(
    response => {
      this.driverdetail = {
       driverDetailsID: 0,
       LicenseNumber: '',
       LicenseCopy : '',
       LicenseExpirydate: '',
       LicenseCode: '',
       LicenseCodeDescription:'',
       employeeId :0
        }
      
      this.displayMessage = "The Driver Details Were Added Successfully";
      this.openSnackBar();
      
      this.getAllDriverDetails();
      this.EditView = false
      this.AddView = false
      
     }
   )
}

};

deleteDriverDetails(id: Number) {
  this.employeeSubService.deleteDriverDetails(id)
    .subscribe(
      response => {
       this.driverdetail = {
         driverDetailsID: 0,
         LicenseNumber: '',
         LicenseCopy :'',
         LicenseExpirydate: '',
         LicenseCode: '',
         LicenseCodeDescription:'',
         employeeId:0
          
        }


        this.getAllDriverDetails();
        this.displayMessage = "Driver Details were successfully removed";
        this.openSnackBar();
     }
   )
};




updateDriverDetails(driverdetail: DriverDetail){
  if (this.driverdetail.LicenseNumber == "" || this.driverdetail.LicenseExpirydate == ""|| this.driverdetail.LicenseCode == " "|| this.driverdetail.LicenseCodeDescription == "" || this.driverdetail.LicenseCopy == "" || this.driverdetail.employeeId == 0){
    this.displayMessage = "The Driver Details could not be updated!”";
     this.openSnackBar();
}

      else{
          this.employeeSubService.updateDriverDetails(driverdetail)
          .subscribe(
            response => {
               this.EditView = true;
               this.displayMessage = "The Driver Details have been updated successfully!";
               this.openSnackBar();
               
   })
}
}

  //Navigation
  EmployeeClick(){
    this.router.navigate(["employee"]);
  }
  EmployeeRoleClick(){
    this.router.navigate(["employeerole"]);
  }


  /*Driver addDriverDetails() {
  if (this.driverdetail.LicenseNumber == "" || this.driverdetail.LicenseExpirydate == "" || this.driverdetail.LicenseCode == "" || this.driverdetail.LicenseCodeDescription == ""|| this.driverdetail.LicenseCopy == "" || this.driverdetail.employeeId == 0){
       this.displayMessage = "Driver Details were unsuccessfully created";
        this.openSnackBar();
}*/
  
}

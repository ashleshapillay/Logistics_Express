import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeRole } from '../Modules/employeerole.module';
import { EmployeeSubService } from '../Service/employee-sub.service';

@Component({
  selector: 'app-employeerole',
  templateUrl: './employeerole.component.html',
  styleUrls: ['./employeerole.component.css']
})
export class EmployeeroleComponent implements OnInit {

  displayedColumns = ['employeeRoleDescription'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  AddDisabled = false;

  employeeroles: EmployeeRole[] = [];
  employeerole: EmployeeRole = {
    employeeRoleId: 0,
    employeeRoleDescription: '',
  }


 ViewEmployee= false;
 ViewDriverDetails=false;
 AddView = false;

 constructor(private employeeSubService: EmployeeSubService,
   private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) {
    }
 
    openSnackBar() {
      this._snackBar.open(this.displayMessage, 'Close', {
        duration: 3000
      });
    }

 ngOnInit(): void {
   this.getAllRoles();
 }


 getAllRoles() {
   this.employeeSubService.getAllRoles()
     .subscribe(
       response => {
         this.employeeroles = response;
         console.log(response);
       }
     )
  }

 addRole() {
  this.AddView = true;
  if (this.employeerole.employeeRoleDescription == "" ){
       this.displayMessage = "Employee Role Could Not Be Added";
        this.openSnackBar();
  }
  else{
  this.employeeSubService.addRole(this.employeerole)
     .subscribe(
       response => {
         this.employeerole = {
          employeeRoleId: 0,
          employeeRoleDescription: '',
          }
        
        this.displayMessage = "Employee Role Was Added Successfully";
        this.openSnackBar();
        this.getAllRoles();
        this.EditView = false
        this.AddView = false
       }
     )
  }

 };

 deleteRole(id: Number) {
   this.employeeSubService.deleteRole(id)
     .subscribe(
       response => {
        this.employeerole = {
          employeeRoleId: 0,
          employeeRoleDescription: '',
         }

         this.getAllRoles();
         this.displayMessage = "Employee Role Was Removed Successfully";
         this.openSnackBar();
       }
     )
 };

 populateForm(employeerole: EmployeeRole){
   this.employeerole = employeerole; 
   this.isDisabled = false; 
   this.AddDisabled=true;
}

 updateRole(employeerole: EmployeeRole){
  if (this.employeerole.employeeRoleDescription == "" ){
    this.displayMessage = "Employee Role could not be updated";
     this.openSnackBar();
}
else{
   this.employeeSubService.updateRole(employeerole)
   .subscribe(
     response => {
        this.EditView = true;
        this.displayMessage = "Employee Role Was Updated Successfully";
        this.openSnackBar();
     })
 }
}



 UpdatePage(){
      this.AddView = false;
      this.EditView = true; 
 }

 AddPage(){
  this.AddView = true; 
  this.employeerole = {
    employeeRoleId: 0,
    employeeRoleDescription: '',
   }
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
  

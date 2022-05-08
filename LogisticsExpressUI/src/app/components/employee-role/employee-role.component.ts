import { Component, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/modules/employee/employee.module';
import { EmployeeRole } from 'src/app/modules/employeerole/employeerole.module';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {

  displayedColumns = ['EmployeeDescription'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  ViewContact = false;
  employeeRoles: EmployeeRole[] = [];
  employeeRole: EmployeeRole = {
    EmployeeRoleId: 0,
    EmployeeDescription: ' '
  }

  @Output() employee: Employee[] =[
    {
      EmployeeId: 0,
      Emp_PhoneNumber: ' ',
      Emp_Email: ' ',
      Emp_Contact: ' ',
      Emp_FirstName: ' ',
      Emp_LastName: ' ',
      EmployeeRoleId: this.employeeRole.EmployeeRoleId
    }
  ]; 

  ViewEmployee= false;
  AddView = false;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open(this.displayMessage, 'Close', {
      duration: 100000
    });
  }

  ////////////////////////////////////////EMPLOYEE ROLE FUNCTIONS////////////////////////////////////////
 //get all employee roles
 getAllEmployeeRoles() {
  this.employeeService.getAllEmployeeRoles()
  .subscribe(
    response => {
      this.employeeRoles = response;
        console.log(response);
        }
      )
  }
//add employee role
addEmployeeRole() {
  if (this.employeeRole.EmployeeDescription == ""){
      this.displayMessage = "Attempt to add employee role was unsuccessful.";
      this.openSnackBar();
  }
  else{
    this.employeeService.addEmployeeRole(this.employeeRole)
      .subscribe(
        response => {
          this.employeeRole = {
            EmployeeRoleId: 0,
            EmployeeDescription: ' '
           }
         this.displayMessage = "Employee role sucessfully added.";
         this.openSnackBar();
         this.getAllEmployeeRoles();
         this.EditView = false
         this.AddView = false
          window.location.reload()
        }
      )
  }
  };
  //update employee role
updateEmployeeRole(employeeRole: EmployeeRole){
  if (this.employeeRole.EmployeeDescription == ""){
      this.displayMessage = "Attempt to update employee role was unsuccessful.";
      this.openSnackBar();
  }
  else{
    this.employeeService.updateEmployeeRole(employeeRole)
    .subscribe(
      response => {
         this.EditView = true;
         this.displayMessage = "Employee role successfully updated.";
         this.openSnackBar();
         window.location.reload();
      })
  }
  };
  //delete employee role
  deleteEmployeeRole(id: Number) {
    this.employeeService.deleteEmployeeRole(id)
      .subscribe(
        response => {
         this.employeeRole = {
          EmployeeRoleId: 0,
          EmployeeDescription: ' '
          }
 
          this.getAllEmployeeRoles();
          this.displayMessage = "Employee role successfully removed.";
          this.openSnackBar();
        }
      )
  };

  //get employee role employees
  getEmployees(id:number){
    this.employeeService.getEmployee(id)
    .subscribe(
      response => {
          this.employee = response;
           this.ViewEmployee = true; 
           localStorage.setItem('EmployeeRoleId',JSON.stringify(id))
        }
    )
  };

//FORM
    populateForm(employeeRole: EmployeeRole){
      this.employeeRole = employeeRole; 
      console.log(employeeRole)
      this.isDisabled = false; 
   }

//PAGE
   UpdatePage(){
    this.AddView = false;
    this.EditView = true; 
    }
  
    AddPage(){
      this.AddView = true; 
      this.employeeRole = {
        EmployeeRoleId: 0,
        EmployeeDescription: ' '
       }
       this.EditView = false;
    }


 
 
  ngOnInit(): void {
    this.getAllEmployeeRoles();
    console.log(this.getAllEmployeeRoles())
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/modules/employee/employee.module';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns = ['Emp_PhoneNumber','Emp_Email','Emp_Contact','Emp_FirstName','Emp_LastName'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  
  employees: Employee[] = [];
  employee: Employee = {
    EmployeeId: 0,
    Emp_PhoneNumber: ' ',
    Emp_Email: ' ',
    Emp_Contact: ' ',
    Emp_FirstName: ' ',
    Emp_LastName: ' ',
    EmployeeRoleId: 0
  }

  ViewEmployeeRole= false;
  AddView = false;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open(this.displayMessage, 'Close', {
      duration: 100000
    });
  }

////////////////////////////////////////EMPLOYEE FUNCTIONS////////////////////////////////////////
 //get all employee
 getAllEmployees() {
  this.employeeService.getAllEmployees()
  .subscribe(
    response => {
      this.employees = response;
        console.log(response);
        }
      )
  }
//add employee
addEmployee() {
  if (this.employee.Emp_PhoneNumber == ""||this.employee.Emp_Email == ""||this.employee.Emp_Contact == ""||this.employee.Emp_FirstName == ""||this.employee.Emp_LastName == ""){
      this.displayMessage = "Attempt to add employee was unsuccessful.";
      this.openSnackBar();
  }
  else{
    this.employeeService.addEmployee(this.employee)
      .subscribe(
        response => {
          this.employee = {
            EmployeeId: 0,
            Emp_PhoneNumber: ' ',
            Emp_Email: ' ',
            Emp_Contact: ' ',
            Emp_FirstName: ' ',
            Emp_LastName: ' ',
            EmployeeRoleId: 0
           }
         this.displayMessage = "Employee sucessfully added.";
         this.openSnackBar();
         this.getAllEmployees();
         this.EditView = false
         this.AddView = false
          window.location.reload()
        }
      )
  }
  };
  //update employee
updateEmployee(employee: Employee){
  if (this.employee.Emp_PhoneNumber == ""||this.employee.Emp_Email == ""||this.employee.Emp_Contact == ""||this.employee.Emp_FirstName == ""||this.employee.Emp_LastName == ""){
      this.displayMessage = "Attempt to update employee was unsuccessful.";
      this.openSnackBar();
  }
  else{
    this.employeeService.updateEmployee(employee)
    .subscribe(
      response => {
         this.EditView = true;
         this.displayMessage = "Employee successfully updated.";
         this.openSnackBar();
         window.location.reload();
      })
  }
  };
  //delete employee 
  deleteEmployee(id: Number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        response => {
         this.employee = {
          EmployeeId: 0,
          Emp_PhoneNumber: ' ',
          Emp_Email: ' ',
          Emp_Contact: ' ',
          Emp_FirstName: ' ',
          Emp_LastName: ' ',
          EmployeeRoleId: 0
          }
          this.getAllEmployees();
          this.displayMessage = "Employee successfully removed.";
          this.openSnackBar();
        }
      )
  };

  //FORM
  populateForm(employee: Employee){
    this.employee = employee; 
    this.isDisabled = false; 
 }

 //PAGE
 UpdatePage(){
  this.AddView = false;
  this.EditView = true; 
  }

  AddPage(){
    this.AddView = true; 
    this.employee = {
      EmployeeId: 0,
      Emp_PhoneNumber: ' ',
      Emp_Email: ' ',
      Emp_Contact: ' ',
      Emp_FirstName: ' ',
      Emp_LastName: ' ',
      EmployeeRoleId: 0
     }
     this.EditView = false;
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }


}

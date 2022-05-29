import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverDetail } from 'src/app/modules/driverdetails/driverdetails';
import { Employee } from 'src/app/modules/employee/employee.module';
import { EmployeeSubService } from 'src/app/services/employee/employee-sub.service';


@Component({
  selector: 'app-driverdetails',
  templateUrl: './driverdetails.component.html',
  styleUrls: ['./driverdetails.component.css']
})
export class DriverdetailsComponent implements OnInit {

  displayedColumns = ['LicenseNumber'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  AddDisabled = false;

  employees: Employee[]=[];
  driverdetail: DriverDetail = {
    DriverDetailsID: 0,
    LicenseNumber: '',
    licenseCopy : '',
    licenseExpirydate: '',
    licenseCode: '',
    licenseCodeDescription:'',
    employeeId:0
  
  }

 ViewEmployeeRole= false;
 ViewEmployee= false;
 AddView = false;


 @Input() driverdetails: DriverDetail[] = []

 
 constructor(private employeeSubService: EmployeeSubService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }
 
    openSnackBar() {
      this._snackBar.open(this.displayMessage, 'Close', {
        duration: 3000
      });
    }

 ngOnInit(): void {
   this.getAllDriverDetails();
 }


 

 getAllDriverDetails() {
   this.employeeSubService.getAllDriverDetails()
     .subscribe(
       response => {
         this.driverdetails = response;
         console.log(response);
       }
     )
  }
  
 addDriverDetails() {
   this.AddView=true;
  if (this.driverdetail.LicenseNumber == "" || this.driverdetail.licenseExpirydate || this.driverdetail.licenseCode == "" || this.driverdetail.licenseCodeDescription == ""|| this.driverdetail.licenseCopy == ""){
       this.displayMessage = "Driver Details were unsuccessfully created";
        this.openSnackBar();
  }
  else{
  this.employeeSubService.addDriverDetails(this.driverdetail)
     .subscribe(
       response => {
         this.driverdetail = {
          DriverDetailsID: 0,
          LicenseNumber: '',
          licenseCopy : '',
          licenseExpirydate: '',
          licenseCode: '',
          licenseCodeDescription:'',
          employeeId :0
          }

          console.log(response);
        
        this.displayMessage = "The Driver Details has been created successfully!";
        this.openSnackBar();
        this.getAllDriverDetails();
        this.EditView = false
        this.AddView = false
        
        window.location.reload();
       }
     )
  }

 };

 deleteDriverDetails(id: Number) {
   this.employeeSubService.deleteDriverDetails(id)
     .subscribe(
       response => {
        this.driverdetail = {
          DriverDetailsID: 0,
          LicenseNumber: '',
          licenseCopy :'',
          licenseExpirydate: '',
          licenseCode: '',
          licenseCodeDescription:'',
          employeeId:0
           
         }

         this.getAllDriverDetails();
         this.displayMessage = "Driver Details were successfully removed";
         this.openSnackBar();
         window.location.reload();
       }
     )
 };

 populateForm(driverdetail: DriverDetail){
   this.driverdetail = driverdetail; 
   this.isDisabled = false; 
   this.AddDisabled=true;
}

 updateDriverDetails(driverdetail: DriverDetail){
  if (this.driverdetail.LicenseNumber == "" || this.driverdetail.licenseCopy|| this.driverdetail.licenseCode || this.driverdetail.licenseCode == "" || this.driverdetail.licenseCodeDescription == ""){
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
        window.location.reload();
     })
 }
}



 UpdatePage(){
      this.AddView = false;
      this.EditView = true; 
 }

 AddPage(){
  this.AddView = true; 
  this.driverdetail = {
    DriverDetailsID: 0,
    LicenseNumber: '',
    licenseCopy : '',
    licenseExpirydate: '',
    licenseCode: '',
    licenseCodeDescription:'',
    employeeId:0
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

  


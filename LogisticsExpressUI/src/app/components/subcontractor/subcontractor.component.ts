import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubcontractorcontactsService } from 'src/app/services/subcontractorcontacts/subcontractorcontacts.service';
import { SubcontractorsService } from 'src/app/services/subcontractors/subcontractors.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subcontractor } from 'src/app/modules/subcontractors/subcontractors.module';
import { SubcontractorContact } from 'src/app/modules/subcontractorcontacts/subcontractorcontacts.module';

@Component({
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.component.html',
  styleUrls: ['./subcontractor.component.css']
})
export class SubcontractorComponent implements OnInit {

  displayedColumns = ['subcontractorName'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  subcontractors: Subcontractor [] = [];
  subcontractor: Subcontractor = {
    subcontractorId: 0,
    subcontractorName: '',
    emailAddress: '',
    phoneNumber: ''
  }

 @Output() subcontractorcontacts: SubcontractorContact[] =[
   {
    subcontractorContactId: 0,
    SubcontractorName: '', 
    phoneNumber: '', 
    emailAddress: '', 
    subcontractorId: this.subcontractor.subcontractorId
   }
 ]; 

 ViewContact= false;
 AddView = false;

 constructor(private subcontractorService: SubcontractorsService,
   private subcontractorContactService: SubcontractorcontactsService,
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
   this.getAllsubcontractor();
 }


 getAllsubcontractor() {
   this.subcontractorService.getAllSubcontractors()
     .subscribe(
       response => {
         this.subcontractors = response;
       }
     )
  }

 addCustomer() {
  
  if (this.subcontractor.subcontractorName == "" || this.subcontractor.emailAddress == "" || this.subcontractor.phoneNumber == ""){
       this.displayMessage = "Subcontractor could not be added";
        this.openSnackBar();
  }
  else{
  this.subcontractorService.addSubcontractor(this.subcontractor)
     .subscribe(
       response => {
         this.subcontractor = {
           subcontractorId: 0,
           subcontractorName: '',
           emailAddress: '',
           phoneNumber: ''
          }
        
        this.displayMessage = "Subcontractor Was Added Successfully";
        this.openSnackBar();
        this.getAllsubcontractor();
        this.EditView = false
        this.AddView = false
       }
     )
  }

 };

 deleteCustomer(id: Number) {
   this.subcontractorService.deleteSubcontractor(id)
     .subscribe(
       response => {
        this.subcontractor = {
          subcontractorId: 0,
          subcontractorName: '',
          emailAddress: '',
          phoneNumber: ''
         }

         this.getAllsubcontractor();
         this.displayMessage = "Subcontractor Was Removed Successfully";
         this.openSnackBar();
       }
     )
 };

 populateForm(subcontractor: Subcontractor){
   this.subcontractor = subcontractor; 
   this.isDisabled = false; 
}

 updateCustomer(subcontractor: Subcontractor){
  if (this.subcontractor.subcontractorName == "" || this.subcontractor.emailAddress == "" || this.subcontractor.phoneNumber == ""){
    this.displayMessage = "Subcontractor could not be updated";
     this.openSnackBar();
}
else{
   this.subcontractorService.updateSubcontractor(subcontractor)
   .subscribe(
     response => {
        this.EditView = true;
        this.displayMessage = "Subcontractor Was Updated Successfully";
        this.openSnackBar();
        window.location.reload();
     })
 }
}

 getCustomerContacts(id:number){
   this.subcontractorContactService.getSubcontractorContacts(id)
   .subscribe(
     response => {
         this.subcontractorcontacts = response;
          this.ViewContact = true; 
          localStorage.setItem('customerID',JSON.stringify(id))
       }
   )
 }

 UpdatePage(){
      this.AddView = false;
      this.EditView = true; 
 }

 AddPage(){
  this.AddView = true; 
  this.subcontractor = {
    subcontractorId: 0,
    subcontractorName: '',
    emailAddress: '',
    phoneNumber: ''
   }
}
}

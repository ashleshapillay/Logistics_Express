import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerContact } from 'src/app/modules/customercontacts/customercontacts.module';
import { Customer } from 'src/app/modules/customers/customers.module';
import { CustomerContactsService } from 'src/app/services/customercontacts/customercontacts.service';
import { CustomersService } from 'src/app/services/customers/customers.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns = ['businessName'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  customers: Customer[] = [];
  customer: Customer = {
    customerId: 0,
    businessName: '',
    emailAddress: '',
    phoneNumber: ''
  }

 @Output() customercontacts: CustomerContact[] =[
   {
    customerContactId: 0,
    contactName: '', 
    phoneNumber: '', 
    emailAddress: '', 
    customerId: this.customer.customerId
   }
 ]; 

 ViewContact= false;
 AddView = false;

 constructor(private customerService: CustomersService,
   private customerContactService: CustomerContactsService,
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
   this.getAllCustomers();
 }


 getAllCustomers() {
   this.customerService.getAllCustomers()
     .subscribe(
       response => {
         this.customers = response;
       }
     )
  }

 addCustomer() {
  
  if (this.customer.businessName == "" || this.customer.emailAddress == "" || this.customer.phoneNumber == ""){
       this.displayMessage = "Customer could not be added";
        this.openSnackBar();
  }
  else{
  this.customerService.addCustomer(this.customer)
     .subscribe(
       response => {
         this.customer = {
           customerId: 0,
           businessName: '',
           emailAddress: '',
           phoneNumber: ''
          }
        
        this.displayMessage = "Customer Was Added Successfully";
        this.openSnackBar();
        this.getAllCustomers();
        this.EditView = false
        this.AddView = false
       }
     )
  }

 };

 deleteCustomer(id: Number) {
   this.customerService.deleteCustomer(id)
     .subscribe(
       response => {
        this.customer = {
          customerId: 0,
          businessName: '',
          emailAddress: '',
          phoneNumber: ''
         }

         this.getAllCustomers();
         this.displayMessage = "Customer Was Removed Successfully";
         this.openSnackBar();
       }
     )
 };

 populateForm(customer: Customer){
   this.customer = customer; 
   this.isDisabled = false; 
}

 updateCustomer(customer: Customer){
  if (this.customer.businessName == "" || this.customer.emailAddress == "" || this.customer.phoneNumber == ""){
    this.displayMessage = "Customer could not be updated";
     this.openSnackBar();
}
else{
   this.customerService.updateCustomer(customer)
   .subscribe(
     response => {
        this.EditView = true;
        this.displayMessage = "Customer Was Updated Successfully";
        this.openSnackBar();
        window.location.reload();
     })
 }
}

 getCustomerContacts(id:number){
   this.customerContactService.getCustomerContacts(id)
   .subscribe(
     response => {
         this.customercontacts = response;
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
  this.customer = {
    customerId: 0,
    businessName: '',
    emailAddress: '',
    phoneNumber: ''
   }
}

}

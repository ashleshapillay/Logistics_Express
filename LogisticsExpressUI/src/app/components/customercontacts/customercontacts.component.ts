import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerContact } from 'src/app/modules/customercontacts/customercontacts.module';
import { Customer } from 'src/app/modules/customers/customers.module';
import { CustomerContactsService } from 'src/app/services/customercontacts/customercontacts.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CustomersComponent } from '../customers/customers.component';

@Component({
  selector: 'app-customercontacts',
  templateUrl: './customercontacts.component.html',
  styleUrls: ['./customercontacts.component.css']
})
export class CustomercontactsComponent implements OnInit  {
  displayedColumns = ['contactName'];
  displayMessage = ''; 
  EditView = false;
  
  @Input() customercontacts: CustomerContact[] = []

  customerId = JSON.parse(localStorage.getItem('customerID')!)
  customercontact: CustomerContact = {
    customerContactId: 0,
    emailAddress: '',
    contactName: '',
    phoneNumber: '',
    customerId: this.customerId
  }

  addcustomer: any= {
      name: this.customercontact.contactName,
      address: this.customercontact.emailAddress,
      number: this.customercontact.phoneNumber,
      customerId: this.customerId
  }

  ViewContact= false;
  AddView = false;

  isDisabled = true; 
 
  constructor(private contactService: CustomerContactsService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
     
   } 

   openSnackBar() {
    this._snackBar.open(this.displayMessage, 'Close', {
      duration: 3000
    });
  }

  getAllContacts() {
    this.contactService.getAllContacts()
      .subscribe(
        response => {
          this.customercontacts = response;
        }
      )
  }

  populateForm(customercontact: CustomerContact) {
    this.customercontact = customercontact;
    this.isDisabled = false; 

  }

  addContact() {
  
  this.addcustomer = {
    name: this.customercontact.contactName,
    address: this.customercontact.emailAddress,
    number: this.customercontact.phoneNumber,
    customerId: this.customerId
}
   
   console.log(this.addcustomer)
   if (this.addcustomer.name == "" || this.addcustomer.address == "" || this.addcustomer.number == ""){
    this.displayMessage = "Contact could not be added";
     this.openSnackBar();
}
else{
    this.contactService.addCustomerContact(this.addcustomer)
      .subscribe(
        response => {
          this.customercontact = 
          {
             contactName: '',
             customerContactId: 0,
             customerId: 0, 
             emailAddress: '',
             phoneNumber: ''
          }
           this.displayMessage = "Contact Was Added Successfully";
           this.openSnackBar();
           this.EditView = false
           this.AddView = false
           this.getCustomerContacts(this.customerId)
          }
          
      )
      
  }
}

  deleteContact(id: number) {

    this.contactService.deleteCustomerContact(id)
      .subscribe(
        response => {
           
          this.customercontact = 
          {
             contactName: '',
             customerContactId: 0,
             customerId: 0, 
             emailAddress: '',
             phoneNumber: ''
          }
          this.displayMessage = "Contact Was Removed Successfully";
          this.openSnackBar();         
          this.getCustomerContacts(this.customerId)

        }
      )
      }

updateContact(customercontact: CustomerContact) {
  
if (this.customercontact.contactName == "" || this.customercontact.emailAddress == "" || this.customercontact.phoneNumber == ""){
      this.displayMessage = "Customer could not be updated";
       this.openSnackBar();
  }
  else{  
    this.contactService.updateCustomerContact(customercontact)
      .subscribe(
        response => {           
          this.displayMessage = "Customer Was Updated Successfully";
          this.openSnackBar();
          this.EditView = true;
          window.location.reload();
        }
      )
  }
}

  getCustomerContacts(id: Number) {
    this.contactService.getCustomerContacts(id)
      .subscribe(
        response => {
           this.customercontacts= response
        }
      )
  }


  NavigateBack()
  {
     window.location.reload();
  }

  UpdatePage(){
    this.AddView = false;
    this.EditView = true; 
}

AddPage(){
this.AddView = true; 
this.customercontact = 
{
   contactName: '',
   customerContactId: 0,
   customerId: 0, 
   emailAddress: '',
   phoneNumber: ''
}
}

}

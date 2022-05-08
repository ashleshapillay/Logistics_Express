import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { SubcontractorContact } from 'src/app/modules/subcontractorcontacts/subcontractorcontacts.module';
import { SubcontractorcontactsService } from 'src/app/services/subcontractorcontacts/subcontractorcontacts.service';


@Component({
  selector: 'app-subcontractorcontacts',
  templateUrl: './subcontractorcontacts.component.html',
  styleUrls: ['./subcontractorcontacts.component.css']
})
export class SubcontractorcontactsComponent implements OnInit {
  displayedColumns = ['contactName'];
  displayMessage = ''; 
  EditView = false;
  
  @Input() subcontractorcontacts: SubcontractorContact[] = []

  subcontractorId = JSON.parse(localStorage.getItem('customerID')!)
  subcontractorcontact: SubcontractorContact = {
    subcontractorContactId: 0,
    emailAddress: '',
    SubcontractorName: '',
    phoneNumber: '',
    subcontractorId: this.subcontractorId
  }

  addcontact: any= {
      name: this.subcontractorcontact.SubcontractorName,
      address: this.subcontractorcontact.emailAddress,
      number: this.subcontractorcontact.phoneNumber,
      subcontractorId: this.subcontractorId
  }

  ViewContact= false;
  AddView = false;

  isDisabled = true; 
 
  constructor(private subcontractContactService: SubcontractorcontactsService,
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
    this.subcontractContactService.getAllContacts()
      .subscribe(
        response => {
          this.subcontractorcontacts = response;
        }
      )
  }

  populateForm(subcontractorscontact: SubcontractorContact) {
    this.subcontractorcontact = subcontractorscontact;
    this.isDisabled = false; 
  }

  addContact() {
  
  this.addcontact = {
    name: this.subcontractorcontact.SubcontractorName,
    address: this.subcontractorcontact.emailAddress,
    number: this.subcontractorcontact.phoneNumber,
    subcontractorId: this.subcontractorId
}
   
   console.log(this.addcontact)
   if (this.addcontact.name == "" || this.addcontact.address == "" || this.addcontact.number == ""){
    this.displayMessage = "Contact could not be added";
     this.openSnackBar();
}
else{
    this.subcontractContactService.addSubcontractorContact(this.addcontact)
      .subscribe(
        response => {
          this.subcontractorcontact = 
          {
            SubcontractorName: '',
             subcontractorContactId: 0,
             subcontractorId: 0, 
             emailAddress: '',
             phoneNumber: ''
          }
           this.displayMessage = "Contact Was Added Successfully";
           this.openSnackBar();
           this.EditView = false
           this.AddView = false
           this.getCustomerContacts(this.subcontractorId)
          }
          
      )
      
  }
}

  deleteContact(id: number) {

    this.subcontractContactService.deleteSubcontractorContact(id)
      .subscribe(
        response => {
           
          this.subcontractorcontact = 
          {
            SubcontractorName: '',
             subcontractorContactId: 0,
             subcontractorId: 0, 
             emailAddress: '',
             phoneNumber: ''
          }
          this.displayMessage = "Contact Was Removed Successfully";
          this.openSnackBar();         
          this.getCustomerContacts(this.subcontractorId)

        }
      )
      }

updateContact(subcontractorcontact: SubcontractorContact) {
  
if (this.subcontractorcontact.SubcontractorName == "" || this.subcontractorcontact.emailAddress == "" || this.subcontractorcontact.phoneNumber == ""){
      this.displayMessage = "Customer could not be updated";
       this.openSnackBar();
  }
  else{  
    this.subcontractContactService.updateSubcontractorContact(subcontractorcontact)
      .subscribe(
        response => {           
          this.subcontractorcontact = 
          {
            SubcontractorName: '',
             subcontractorContactId: 0,
             subcontractorId: 0, 
             emailAddress: '',
             phoneNumber: ''
          }
          this.EditView = true;
          this.displayMessage = "Customer Was Updated Successfully";
          this.openSnackBar();
          window.location.reload();
        }
      )
  }
}

  getCustomerContacts(id: Number) {
    this.subcontractContactService.getSubcontractorContacts(id)
      .subscribe(
        response => {
           this.subcontractorcontacts= response
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
this.subcontractorcontact = 
{
  SubcontractorName: '',
   subcontractorContactId: 0,
   subcontractorId: 0, 
   emailAddress: '',
   phoneNumber: ''
}
}

}

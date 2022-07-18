import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadConfirmation } from '../Modules/loadconfirmation';
import { LoadConfirmationServiceService } from '../Service/load-confirmation-service.service';

@Component({
  selector: 'app-load-confirmation',
  templateUrl: './load-confirmation.component.html',
  styleUrls: ['./load-confirmation.component.css']
})
export class LoadConfirmationComponent implements OnInit {

  displayedColumns = ['employeeRoleDescription'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  AddDisabled = false;

  loadConfirmationDetails: LoadConfirmation [] = [];
  loadConfirmationDetail: LoadConfirmation = {
    LoadConfirmationID :0,
     DateIssued : '',
    Notes : '',
  }


 ViewLoadConfirmation= false;
 AddView = false;

 constructor(private loadConfirmationService : LoadConfirmationServiceService,
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
   this.getAllLoadConfirmations();
 }


 getAllLoadConfirmations() {
   this.loadConfirmationService.GetAllLoadConfirmations()
     .subscribe(
       response => {
         this.loadConfirmationDetails = response;
         console.log(response);
       }
     )
  }

 addLoadConfirmation() {
  this.AddView = true;
  if (this.loadConfirmationDetail.DateIssued == "" || this.loadConfirmationDetail.Notes == ""  ){
       this.displayMessage = "Load Confirmation Details Could Not Be Added";
        this.openSnackBar();
  }
  else{
  this.loadConfirmationService.addLoadConfirmation(this.loadConfirmationDetail)
     .subscribe(
       response => {
         this.loadConfirmationDetail = {
            LoadConfirmationID :0,
            DateIssued : '',
           Notes : '',
          }
        
        this.displayMessage = "Load Confirmation Details Were Added Successfully";
        this.openSnackBar();
        this.getAllLoadConfirmations();
        this.EditView = false
        this.AddView = false
       }
     )
  }

 };

 DeleteLoadConfirmation(id: Number) {
   this.loadConfirmationService.deleteLoadConfirmation(id)
     .subscribe(
       response => {
        this.loadConfirmationDetail = {
            LoadConfirmationID :0,
            DateIssued : '',
           Notes : '',
         }

         this.getAllLoadConfirmations();
         this.displayMessage = "Load Confirmation Details Were Removed Successfully";
         this.openSnackBar();
       }
     )
 };

 populateForm(loadConfirmationDetail: LoadConfirmation){
   this.loadConfirmationDetail = loadConfirmationDetail; 
   this.isDisabled = false; 
   this.AddDisabled=true;
}

 updateLoadConfirmation(loadConfirmationDetail: LoadConfirmation){
  if ( this.loadConfirmationDetail.DateIssued == "" || this.loadConfirmationDetail.Notes == ""   ){
    this.displayMessage = "Load Confirmation Details not be updated";
     this.openSnackBar();
}
else{
   this.loadConfirmationService.updateLoadConfirmation(loadConfirmationDetail)
   .subscribe(
     response => {
        this.EditView = true;
        this.displayMessage = "Load Confirmation Details Were Updated Successfully";
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
  this.loadConfirmationDetail = {
    LoadConfirmationID :0,
     DateIssued : '',
    Notes : '',
   }

}
}

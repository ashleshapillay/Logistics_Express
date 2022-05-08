import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Suburb } from 'src/app/modules/locationmodules/suburb.module';
import { LocationserviceService } from 'src/app/services/locations/locationservice.service';
import { Address } from 'src/app/modules/locationmodules/address.module';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  displayedColumns = ['streetNumber', 'streetName'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  AddDisabled = false; 

  suburbs: Suburb[] = [];

  addresses: Address[] = [];
  address: Address = {
    addressId: 0,
    streetNumber: 0,
    streetName:'',
    suburbId:0
  }

  ViewCountry =false;
  ViewProvince= false;
  ViewCity= false;
  ViewSuburb= false;
  AddView = false;

  constructor(private locationservive: LocationserviceService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open(this.displayMessage, 'Close', {
      duration: 100000
    });
  }

   //Navigation
   CountryClick(){
    this.router.navigate(["countries"]);
  }
  ProvinceClick(){
    this.router.navigate(["provinces"]);
  }
  CityClick(){
    this.router.navigate(["cities"]);
  }
  SuburbClick(){
    this.router.navigate(["suburbs"]);
  }
  AddressClick(){
    this.router.navigate(["addresses"]);
  }

   //ADDRESS FUNCTIONS

    //get all addresses
    getAllAddresses() {
      this.locationservive.getAllAddresses()
        .subscribe(
          response => {
            this.addresses = response;
            console.log(response);
          }
        )
    };
    //get all suburbs
        getAllSuburbs() {
          this.locationservive.getAllSuburbs()
            .subscribe(
              response => {
                this.suburbs = response;
                console.log(response);
              }
            )
        };
    //add address
    addAddress() {
      this.AddView = true;
      if (this.address.streetNumber == 0 || this.address.streetName == ""|| this.address.suburbId == 0){
        this.displayMessage = "Attempt to add address was unsuccessful.";
        this.openSnackBar();
    }
    else{
      this.locationservive.addAddress(this.address)
        .subscribe(
          response => {
            this.address = {
              addressId: 0,
              streetNumber:0,
              streetName: '',
              suburbId:0
             }
             console.log(response);
           this.displayMessage = "Address successfully added.";
           this.openSnackBar();
           this.getAllAddresses();
           this.EditView = false
           this.AddView = false
            window.location.reload()
          }
        )
    }
    };
  //update address
        updateAddress(address: Address){
          if (this.address.streetNumber == 0 || this.address.streetName == ""|| this.address.suburbId == 0){
            this.displayMessage = "Attempt to update address was unsuccessful.";
            this.openSnackBar();
        }
        else{
          this.locationservive.updateAddress(address)
          .subscribe(
            response => {
               this.EditView = true;
               this.displayMessage = "Address successfully updated.";
               this.openSnackBar();
               window.location.reload();
            })
          }
        };
        //delete address
        deleteAddress(id: Number) {
          this.locationservive.deleteAddress(id)
            .subscribe(
              response => {
               this.address = {
                 addressId: 0,
                 streetNumber:0,
                 streetName: '',
                 suburbId:0
                }
                this.getAllSuburbs();
                this.displayMessage = "Address successfully removed.";
                this.openSnackBar();
                window.location.reload();

              }
            )
        };

//FORM
populateForm(address: Address){
  this.address = address; 
  this.isDisabled = false; 
  this.AddDisabled = true; 

}

//PAGE
UpdatePage(){
this.AddView = false;
this.EditView = true; 
}

AddPage(){
  this.AddView = true; 
  this.address = {
    addressId: 0,
    streetNumber:0,
    streetName: '',
    suburbId:0
   }
   this.EditView = false;
}

  ngOnInit(): void {
    this.getAllSuburbs();
    this.getAllAddresses();
  }

}

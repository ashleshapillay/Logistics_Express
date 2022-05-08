import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Suburb } from 'src/app/modules/locationmodules/suburb.module';
import { City } from 'src/app/modules/locationmodules/city.module';
import { Address } from 'src/app/modules/locationmodules/address.module';
import { LocationserviceService } from 'src/app/services/locations/locationservice.service';


@Component({
  selector: 'app-suburbs',
  templateUrl: './suburbs.component.html',
  styleUrls: ['./suburbs.component.scss']
})
export class SuburbsComponent implements OnInit {
  displayedColumns = ['name'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  
  cities: City[] = [];

  suburbs: Suburb[] = [];
  suburb: Suburb = {
    suburbId: 0,
    name: '',
    cityId:0
  }

  @Output() address: Address[] =[
    {
     addressId: 0,
     streetNumber:0,
     streetName: '',
     suburbId: this.suburb.suburbId
    }
  ]; 

  ViewCountry =false;
  ViewProvince= false;
  ViewCity= false;
  ViewAddress= false;
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

  //SUBURB FUNCTIONS

    //get all cities
    getAllCities() {
      this.locationservive.getAllCities()
        .subscribe(
          response => {
            this.cities = response;
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
    //add suburb
    addSuburb() {
      if (this.suburb.name == ""|| this.suburb.cityId==0){
        this.displayMessage = "Attempt to add suburb was unsuccessful.";
        this.openSnackBar();
    }
    else{
      this.locationservive.addSuburb(this.suburb)
        .subscribe(
          response => {
            this.suburb = {
              suburbId: 0,
              name: '',
              cityId:0
             }
             console.log(response);
           this.displayMessage = "Suburb successfully added.";
           this.openSnackBar();
           this.getAllSuburbs();
           this.EditView = false
           this.AddView = false
            window.location.reload()
          }
        )
    }
    };
        //update suburb
        updateSuburb(suburb: Suburb){
          if (this.suburb.name == ""|| this.suburb.cityId==0){
            this.displayMessage = "Attempt to update suburb was unsuccessful.";
            this.openSnackBar();
        }
        else{
          this.locationservive.updateSuburb(suburb)
          .subscribe(
            response => {
               this.EditView = true;
               this.displayMessage = "Suburb successfully updated.";
               this.openSnackBar();
               window.location.reload();
            })
          }
        };
        //delete suburb
        deleteSuburb(id: Number) {
          this.locationservive.deleteSuburb(id)
            .subscribe(
              response => {
               this.suburb = {
                 suburbId: 0,
                 name: '',
                 cityId:0
                }
                this.getAllSuburbs();
                this.displayMessage = "Suburb successfully removed.";
                this.openSnackBar();
              }
            )
        };

//FORM
populateForm(suburb: Suburb){
  this.suburb = suburb; 
  this.isDisabled = false; 
}

//PAGE
UpdatePage(){
this.AddView = false;
this.EditView = true; 
}

AddPage(){
  this.AddView = true; 
  this.suburb = {
    suburbId: 0,
    name: '',
    cityId:0
   }
   this.EditView = false;
}


  ngOnInit(): void {
    this.getAllSuburbs();
    this.getAllCities();
  }

}

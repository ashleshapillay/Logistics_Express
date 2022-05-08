import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Country } from 'src/app/modules/locationmodules/country.module';
import { Province } from 'src/app/modules/locationmodules/province.module';
import { LocationserviceService } from 'src/app/services/locations/locationservice.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  displayedColumns = ['name'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  
  countries: Country[] = [];
  country: Country = {
    countryId: 0,
    name: ''
  }

  @Output() province: Province[] =[
    {
     provinceId: 0,
     name: '',
     countryId: this.country.countryId
    }
  ]; 

  ViewProvince= false;
  ViewCity= false;
  ViewSuburb= false;
  ViewAddress= false;
  AddView = false;

  constructor(private locationservive: LocationserviceService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open(this.displayMessage, 'Close', {
      duration: 100000
    });
  }


////////////////////////////////////////COUNTRY FUNCTIONS////////////////////////////////////////

//get all countries
  getAllCountries() {
    this.locationservive.getAllCountries()
    .subscribe(
      response => {
        this.countries = response;
          console.log(response);
          }
        )
    }
//add country
  addCountry() {
    if (this.country.name == ""){
        this.displayMessage = "Attempt to add country was unsuccessful.";
        this.openSnackBar();
    }
    else{
      this.locationservive.addCountry(this.country)
        .subscribe(
          response => {
            this.country = {
              countryId: 0,
              name: ''
             }
           this.displayMessage = "Country sucessfully added.";
           this.openSnackBar();
           this.getAllCountries();
           this.EditView = false
           this.AddView = false
            window.location.reload()
          }
        )
    }
    };
    //update country
  updateCountry(country: Country){
    if (this.country.name == ""){
        this.displayMessage = "Attempt to update country was unsuccessful.";
        this.openSnackBar();
    }
    else{
      this.locationservive.updateCountry(country)
      .subscribe(
        response => {
           this.EditView = true;
           this.displayMessage = "Country successfully updated.";
           this.openSnackBar();
           window.location.reload();
        })
    }
    };
    //delete country
    deleteCountry(id: Number) {
      this.locationservive.deleteCountry(id)
        .subscribe(
          response => {
           this.country = {
             countryId: 0,
             name: ''
            }
   
            this.getAllCountries();
            this.displayMessage = "Country successfully removed.";
            this.openSnackBar();
          }
        )
    };

    //get country provinces
    getProvinces(id:number){
      this.locationservive.getProvince(id)
      .subscribe(
        response => {
            this.province = response;
             this.ViewProvince = true; 
             localStorage.setItem('countryId',JSON.stringify(id))
          }
      )
    };

    //FORM
    populateForm(country: Country){
      this.country = country; 
      this.isDisabled = false; 
   }

   //PAGE
   UpdatePage(){
    this.AddView = false;
    this.EditView = true; 
    }
  
    AddPage(){
      this.AddView = true; 
      this.country = {
        countryId: 0,
        name: ''
       }
       this.EditView = false;
    }


    ngOnInit(): void {
      this.getAllCountries();
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
}

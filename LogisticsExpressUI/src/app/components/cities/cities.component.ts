import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { City } from 'src/app/modules/locationmodules/city.module';
import { Province } from 'src/app/modules/locationmodules/province.module';
import { Suburb } from 'src/app/modules/locationmodules/suburb.module';
import { LocationserviceService } from 'src/app/services/locations/locationservice.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  displayedColumns = ['name'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  AddDisabled = false; 
  provinces: Province[] = [];

  cities: City[] = [];
  city: City = {
    cityId: 0,
    name: '',
    provinceId:0
  }

  @Output() suburb: Suburb[] =[
    {
     suburbId: 0,
     name: '',
     cityId: this.city.cityId
    }
  ]; 

  ViewCountry =false;
  ViewProvince= false;
  ViewSuburb= false;
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

  //CITY FUNCTIONS

    //get all provinces
    getAllProvinces() {
      this.locationservive.getAllProvinces()
        .subscribe(
          response => {
            this.provinces = response;
            console.log(response);
          }
        )
    };
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
    //add city
    addCity() {
      this.AddView = true;

      if (this.city.name == ""|| this.city.provinceId==0){
        this.displayMessage = "Attempt to add city was unsuccessful.";
        this.openSnackBar();
    }
    else{
      this.locationservive.addCity(this.city)
        .subscribe(
          response => {
            this.city = {
              cityId: 0,
              name: '',
              provinceId:0
             }
             console.log(response);
           this.displayMessage = "City successfully added.";
           this.openSnackBar();
           this.getAllCities();
           this.EditView = false
           this.AddView = false
            window.location.reload()
          }
        )
    }
    };
        //update city
        updateCity(city: City){
          if (this.city.name == ""|| this.city.provinceId==0){
            this.displayMessage = "Attempt to update city was unsuccessful.";
            this.openSnackBar();
        }
        else{
          this.locationservive.updateCity(city)
          .subscribe(
            response => {
               this.EditView = true;
               this.displayMessage = "City successfully updated.";
               this.openSnackBar();
               window.location.reload();
            })
          }
        };
        //delete city
        deleteCity(id: Number) {
          this.locationservive.deleteCity(id)
            .subscribe(
              response => {
               this.city = {
                 cityId: 0,
                 name: '',
                 provinceId:0
                }
                this.getAllCities();
                this.displayMessage = "City successfully removed.";
                this.openSnackBar();
                window.location.reload();
              }
            )
        };


//FORM
populateForm(city: City){
  this.city = city; 
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
  this.city = {
    cityId: 0,
    name: '',
    provinceId:0
   }
   this.EditView = false;
}

  ngOnInit(): void {
    this.getAllProvinces();
    this.getAllCities();
  }

}

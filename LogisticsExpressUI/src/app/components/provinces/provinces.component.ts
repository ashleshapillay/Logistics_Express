import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Province } from 'src/app/modules/locationmodules/province.module';
import { Country } from 'src/app/modules/locationmodules/country.module';
import { City } from 'src/app/modules/locationmodules/city.module';
import { LocationserviceService } from 'src/app/services/locations/locationservice.service';


@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss']
})
export class ProvincesComponent implements OnInit {

  displayedColumns = ['name'];
  EditView = false; 
  displayMessage = ''; 
  isDisabled = true; 
  
  countries: Country[] = [];

  provinces: Province[] = [];
  province: Province = {
    provinceId: 0,
    name: '',
    countryId:0
  }


  @Output() city: City[] =[
    {
     cityId: 0,
     name: '',
     provinceId: this.province.provinceId
    }
  ]; 


  ViewCountry =false;
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

////////////////////////////////////////PROVINCE FUNCTIONS////////////////////////////////////////

    //get all countries
    getAllCountries() {
      this.locationservive.getAllCountries()
        .subscribe(
          response => {
            this.countries = response;
            console.log(response);
          }
        )
    };
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
    //add province
  addProvince() {
    if (this.province.name == ""|| this.province.countryId==0){
        this.displayMessage = "Attempt to add province was unsuccessful.";
        this.openSnackBar();
    }
    else{
      this.locationservive.addProvince(this.province)
        .subscribe(
          response => {
            this.province = {
              provinceId: 0,
              name: '',
              countryId:0
             }
             console.log(response);
           this.displayMessage = "Province successfully added.";
           this.openSnackBar();
           this.getAllProvinces();
           this.EditView = false
           this.AddView = false
            window.location.reload()
          }
        )
    }
    };
  //update province
    updateProvince(province: Province){
      if (this.province.name == ""|| this.province.countryId==0){
        this.displayMessage = "Attempt to update province was unsuccessful.";
        this.openSnackBar();
      }
      else{
          this.locationservive.updateProvince(province)
          .subscribe(
            response => {
               this.EditView = true;
               this.displayMessage = "Province successfully updated.";
               this.openSnackBar();
               window.location.reload();
            })
  }
  };
  //delete province
        deleteProvince(id: Number) {
          this.locationservive.deleteProvince(id)
            .subscribe(
              response => {
               this.province = {
                 provinceId: 0,
                 name: '',
                 countryId:0
                }
                this.getAllProvinces();
                this.displayMessage = "Province successfully removed.";
                this.openSnackBar();
              }
            )
        };
    
//FORM
   populateForm(province: Province){
    this.province = province; 
    this.isDisabled = false; 
 }

 //PAGE
 UpdatePage(){
  this.AddView = false;
  this.EditView = true; 
  }

  AddPage(){
    this.AddView = true; 
    this.province = {
      provinceId: 0,
      name: '',
      countryId:0
     }
     this.EditView = false;
  }

  ngOnInit(): void {
    this.getAllProvinces();
    this.getAllCountries();
  }

}

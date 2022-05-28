import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomercontactsComponent } from './components/customercontacts/customercontacts.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountriesComponent } from './components/countries/countries.component';
import { ProvincesComponent } from './components/provinces/provinces.component';
import { CitiesComponent } from './components/cities/cities.component';
import { SuburbsComponent } from './components/suburbs/suburbs.component';
import { AddressesComponent } from './components/addresses/addresses.component';


import { SubcontractorComponent } from './components/subcontractor/subcontractor.component';
import { SubcontractorcontactsComponent } from './components/subcontractorcontacts/subcontractorcontacts.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeRoleComponent } from './components/employee-role/employee-role.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleDriverComponent } from './components/vehicle-driver/vehicle-driver.component';
import { VehicleSpecsComponent } from './components/vehicle-specs/vehicle-specs.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomercontactsComponent,
    NavigationBarComponent,
    DashboardComponent ,
    CountriesComponent,
    ProvincesComponent,
    CitiesComponent,
    SuburbsComponent,
    AddressesComponent,
    SubcontractorComponent,
    SubcontractorcontactsComponent,
    EmployeeComponent,
    EmployeeRoleComponent,
    VehicleComponent,
    VehicleDriverComponent,
    VehicleSpecsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

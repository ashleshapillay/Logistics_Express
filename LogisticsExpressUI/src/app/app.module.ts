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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CountriesComponent } from './components/countries/countries.component';
import { ProvincesComponent } from './components/provinces/provinces.component';
import { CitiesComponent } from './components/cities/cities.component';
import { SuburbsComponent } from './components/suburbs/suburbs.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { SubcontractorComponent } from './components/subcontractor/subcontractor.component';
import { SubcontractorcontactsComponent } from './components/subcontractorcontacts/subcontractorcontacts.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DriverdetailsComponent } from './components/driverdetails/driverdetails.component';

import { VehicleDriverComponent } from './components/vehicle-driver/vehicle-driver.component';
import { VehicleSpecsComponent } from './components/vehicle-specs/vehicle-specs.component';
import { MsalModule, MsalInterceptor, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { AuthenicationService } from './services/authenication/authenication.service';


import { RepairRequestsComponent } from './components/repairrequest/repair-requests.component';

import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeroleComponent } from './components/employeerole/employeerole.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';

import { MatSnackBarModule} from '@angular/material/snack-bar';

import { LoadConfirmationComponent } from './components/load-confirmation/load-confirmation.component';

import { QuoteComponent } from './components/quote/quote.component';
import { RequestQuoteComponent } from './components/request-quote/request-quote.component';
import { OutstandingQuotesComponent } from './components/outstanding-quotes/outstanding-quotes.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CurrentDeliveriesComponent } from './components/current-deliveries/current-deliveries.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';


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
    EmployeeroleComponent,
    DriverdetailsComponent,
    VehicleDriverComponent,
    VehicleSpecsComponent,
    RepairRequestsComponent,
    VehicleComponent,
    LoadConfirmationComponent
    QuoteComponent,
    RequestQuoteComponent,
    OutstandingQuotesComponent,
    InvoiceComponent,
    CurrentDeliveriesComponent,
    EditQuoteComponent,


   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSnackBarModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
           auth: {
               clientId: '7dff351f-fce3-470b-b470-f182fa7546ed', 
               redirectUri: 'http://localhost:4200/dashboard', 
                authority: 'https://login.microsoftonline.com/8812b1d1-ea33-4d29-b95f-7790c63d6572'
           },
          cache: 
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:false
          }
        }
      ), 
      {
        interactionType: InteractionType.Redirect, 
        authRequest: {
          scopes:['user.read']
        }
      },
      {
         interactionType: InteractionType.Redirect, 
         protectedResourceMap: new Map(
           [
            ['https://graph.microsoft.com/v1.0/me',['user.Read']] 
           ]
         )
      }
      ),
      MatNativeDateModule,
      NgbPaginationModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
      
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:MsalInterceptor,
      multi: true
    }, MsalGuard, AuthenicationService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

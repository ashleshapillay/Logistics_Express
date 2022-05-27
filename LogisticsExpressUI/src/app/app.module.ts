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
import { MsalModule, MsalInterceptor, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { AuthenicationService } from './services/authenication/authenication.service';

import { RepairRequestsComponent } from './components/repairrequest/repair-requests.component';



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
    RepairRequestsComponent

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
    ReactiveFormsModule,
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
      )
      
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesComponent } from './components/addresses/addresses.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CustomercontactsComponent } from './components/customercontacts/customercontacts.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProvincesComponent } from './components/provinces/provinces.component';
import { SuburbsComponent } from './components/suburbs/suburbs.component';

import { SubcontractorComponent } from './components/subcontractor/subcontractor.component';
import { SubcontractorcontactsComponent } from './components/subcontractorcontacts/subcontractorcontacts.component';

import { EmployeeComponent } from './components/employee/employee.component';


import { DriverdetailsComponent } from './components/driverdetails/driverdetails.component';
import { EmployeeroleComponent } from './components/employeerole/employeerole.component';

import { MsalGuard } from '@azure/msal-angular';

import { RepairRequestsComponent } from './components/repairrequest/repair-requests.component';


import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleDriverComponent } from './components/vehicle-driver/vehicle-driver.component';
import { VehicleSpecsComponent } from './components/vehicle-specs/vehicle-specs.component';
import { LoadConfirmationComponent } from './components/load-confirmation/load-confirmation.component';

import { QuoteComponent } from './components/quote/quote.component';
import { RequestQuoteComponent } from './components/request-quote/request-quote.component';
import { OutstandingQuotesComponent } from './components/outstanding-quotes/outstanding-quotes.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';


const routes: Routes = [
    { path: 'customers', component: CustomersComponent},
    { path: 'customercontacts', component: CustomercontactsComponent},
    {path: 'countries', component: CountriesComponent},
    {path: 'provinces', component: ProvincesComponent},
    {path: 'cities', component: CitiesComponent},
    {path: 'suburbs', component: SuburbsComponent},
    {path: 'addresses', component: AddressesComponent},
    { path: 'subcontractor', component: SubcontractorComponent},
    { path: 'subcontractocontacts', component: SubcontractorcontactsComponent},
    { path: 'employee', component: EmployeeComponent},

    { path: 'employeerole', component: EmployeeroleComponent},
    { path: 'driverdetails', component: DriverdetailsComponent},

  
    { path: 'vehicle', component: VehicleComponent },
    {path:'vehicleDriver', component: VehicleDriverComponent},
    {path: 'vehicleSpecs', component: VehicleSpecsComponent},

    { path: '', component: DashboardComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate:[MsalGuard]},
    { path: 'repair-requests', component: RepairRequestsComponent},


    { path: 'loadconfirmation', component: LoadConfirmationComponent}

    { path: 'quote', component: QuoteComponent},
    {path: 'request-quote', component: RequestQuoteComponent},
    {path: 'outstanding-quote', component: OutstandingQuotesComponent},

    {path:'invoice', component: InvoiceComponent},
    {path: 'edit-quote', component: EditQuoteComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      initialNavigation: 'enabled'
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

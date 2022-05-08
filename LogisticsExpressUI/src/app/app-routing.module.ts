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
import { EmployeeRoleComponent} from './components/employee-role/employee-role.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
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
    { path: 'employeerole', component: EmployeeRoleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

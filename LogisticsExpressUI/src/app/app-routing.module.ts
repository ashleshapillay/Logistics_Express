import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomercontactsComponent } from './components/customercontacts/customercontacts.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'customers', component: CustomersComponent},
    { path: 'customercontacts', component: CustomercontactsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairRequestPage } from './repair-request.page';

const routes: Routes = [
  {
    path: '',
    component: RepairRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairRequestPageRoutingModule {}

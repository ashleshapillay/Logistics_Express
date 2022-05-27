import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairRequestPageRoutingModule } from './repair-request-routing.module';

import { RepairRequestPage } from './repair-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairRequestPageRoutingModule
  ],
  declarations: [RepairRequestPage]
})
export class RepairRequestPageModule {}

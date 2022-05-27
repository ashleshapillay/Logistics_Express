import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileServicesService } from '../services/mobile-services.service';
import { RepairRequest } from '../interfaces/repair-request';

@Component({
  selector: 'app-repair-request',
  templateUrl: './repair-request.page.html',
  styleUrls: ['./repair-request.page.css'],
})
export class RepairRequestPage implements OnInit {

  repairRequests: RepairRequest[] = [];
  repairRequest: RepairRequest = {
    RepairRequestId: 0,
    Date : new Date(),
    Description : '',
    VehicleId : 0
  }

  constructor(private route: ActivatedRoute, private repairRequestService: MobileServicesService) { }

    //add request
    addRepairRequest() {
      //direct to add view
      //validation
      this.repairRequestService.addRepairRequest(this.repairRequest)
          .subscribe(
            response => {
              this.repairRequest = {
                RepairRequestId: 0,
                Date : new Date(),
                Description : '',
                VehicleId : 0
               }
            console.log(response);
            window.location.reload()
            }
          )
      };

  ngOnInit() {
  }

}

import { DatePipe } from '@angular/common';
import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RepairRequest } from 'src/app/modules/repairrequest/repairrequest.module';
import { RepairrequestserviceService } from 'src/app/services/repairrequest/repairrequestservice.service';

@Component({
  selector: 'app-repair-requests',
  templateUrl: './repair-requests.component.html',
  styleUrls: ['./repair-requests.component.css']
})
export class RepairRequestsComponent implements OnInit {

  repairRequests: RepairRequest[] = [];
  repairRequest: RepairRequest = {
    RepairRequestId: 0,
    Date : new Date(),
    Description : '',
    VehicleId : 0
  }

  constructor(private route: ActivatedRoute, private repairRequestService: RepairrequestserviceService) { }

  //COMPONENTS TO ACCESS BACKEND
   //get all requests
   getAllRepairRequests() {
    this.repairRequestService.getAllRepairRequests()
      .subscribe(
        response => {
          this.repairRequests = response;
          console.log(response);
        }
      )
    };

  //delete request - FULFILLED 
      deleteRepairRequest(id: Number) {
        this.repairRequestService.deleteRepairRequest(id)
          .subscribe(
            response => {
             this.repairRequest = {
              RepairRequestId: 0,
              Date : new Date(),
              Description : '',
              VehicleId : 0
              }
              this.getAllRepairRequests();
              //TO DO: Redirect to Add Repair Details
              //TO DO: Validation
              console.log("Province successfully removed.");
              window.location.reload();
            }
          )
      };

  ngOnInit(): void {
    this.getAllRepairRequests();
  }

}

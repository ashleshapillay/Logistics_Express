import { DatePipe } from '@angular/common';
import { NodeWithI18n } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RepairRequest } from 'src/app/modules/repairrequest/repairrequest.module';
import { RepairrequestserviceService } from 'src/app/services/repairrequest/repairrequestservice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-repair-requests',
  templateUrl: './repair-requests.component.html',
  styleUrls: ['./repair-requests.component.css']
})
export class RepairRequestsComponent implements OnInit {
  displayedColumns = ['Date','Description','VehicleId'];

  repairRequests: RepairRequest[] = [];
  repairRequest: RepairRequest = {
    RepairRequestId: 0,
    Date : new Date(),
    Description : '',
    VehicleId : 0
  }

  title = 'appBootstrap';
  
  closeResult: string = '';

  deleteId: Number = 0; 


  constructor(private route: ActivatedRoute, private repairRequestService: RepairrequestserviceService, private modalService: NgbModal) { }

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
      deleteRepairRequest() {
        console.log(this.deleteId)
        this.repairRequestService.deleteRepairRequest(this.deleteId)
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
              window.location.reload();
            }
          )
      };

  ngOnInit(): void {
    this.getAllRepairRequests();
  }

  open(content:any, id:Number) {
    this.deleteId = id; 
    console.log(this.deleteId)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}

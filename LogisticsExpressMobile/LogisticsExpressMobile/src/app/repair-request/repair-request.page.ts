import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MobileServicesService } from '../services/mobile-services.service';
import { RepairRequest } from '../interfaces/repair-request';
import { ToastController } from '@ionic/angular';

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

  constructor(private route: ActivatedRoute,private router: Router, private repairRequestService: MobileServicesService, private toastCtrl: ToastController) { }

    //add request
    async addRepairRequest() {
      if(this.repairRequest.Description == ""){
       //toast alert
       let toast = await this.toastCtrl.create({
         message: 'The attempt to log a repair request was unsuccessful',
         duration: 3000,
         position: 'top',
       });
       //display alert
       toast.present();  
      }
      else {
      this.repairRequestService.addRepairRequest(this.repairRequest)
          .subscribe(
            async response => {
              this.repairRequest = {
                RepairRequestId: 0,
                Date : new Date(),
                Description : '',
                VehicleId : 0
               }
          //toast alert
          let toast = await this.toastCtrl.create({
            message: 'The repair request has successfully been logged into the system.',
            duration: 3000,
            position: 'top',
          });
          //display alert
          toast.present();
          
          setTimeout(function(){
            window.location.reload();
          }, 1000);
            }
          )
      }
      };

  ngOnInit() {
  }

}

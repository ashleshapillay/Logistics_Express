import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Fuel } from '../interfaces/fuel';
import { MobileServicesService } from '../services/mobile-services.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.page.html',
  styleUrls: ['./fuel-list.page.css'],
})
export class FuelListPage implements OnInit {

  fuelEntries: Fuel[] = [];
  fuelEntry: Fuel = {
    fuelEntryId : 0,
    log_Date : new Date(),
    litres : 0,
    price_Per_Litre : 0,
    total_Spent : 0,
    receiptImage :'',
    vehicleId : 0
  }


  confirmDelete: Boolean; 

constructor(private route: ActivatedRoute, private fuelEntryService: MobileServicesService, private toastCtrl: ToastController, public alertController: AlertController ) { }

//FUEL ENTRIES - ACCESS BACKEND
//TO DO: Validation and Html

  //get all entries
    getAllFuelEntries() {
      this.fuelEntryService.getAllFuelEntries()
        .subscribe(
          response => {
            this.fuelEntries = response;
            console.log(response);
          }
        )
    };
  //add fuel entry
    addFuelEntry() {
      this.fuelEntryService.addFuelEntry(this.fuelEntry)
        .subscribe(
          response => {
            this.fuelEntry = {
              fuelEntryId : 0,
              log_Date : new Date(),
              litres : 0,
              price_Per_Litre : 0,
              total_Spent : 0,
              receiptImage :'',
              vehicleId : 0
            }
          console.log(response);
          window.location.reload()
          }
        )
    };

  //update fuel entry
    updateFuelEntry(fuelEntry: Fuel){
      this.fuelEntryService.updateFuelEntry(fuelEntry)
          .subscribe(
            response => {
              window.location.reload();
            })
    };

  //delete fuel entry
    deleteFuelEntry(id: Number) {
      this.fuelEntryService.deleteFuelEntry(id)
        .subscribe(
          async response => {
           this.fuelEntry = {
            fuelEntryId : 0,
            log_Date : new Date(),
            litres : 0,
            price_Per_Litre : 0,
            total_Spent : 0,
            receiptImage :'',
            vehicleId : 0
            }
          //toast alert
          let toast = await this.toastCtrl.create({
            message: 'The fuel entry has successfully been deleted.”',
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
    };

  ngOnInit() {
    this.getAllFuelEntries();
  }

  delete(id:Number){
    this.presentAlertConfirm(id);
  }

  async presentAlertConfirm(id: Number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Fuel Entry',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            this.confirmDelete = false; 
            console.log( this.confirmDelete);
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            this.confirmDelete = true; 
            console.log( this.confirmDelete);
            this.deleteFuelEntry(id)
          }
        }
      ]
    });

    await alert.present();

}
}

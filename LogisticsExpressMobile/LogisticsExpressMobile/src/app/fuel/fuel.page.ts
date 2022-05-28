import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileServicesService } from '../services/mobile-services.service';
import { Fuel } from 'src/app/interfaces/fuel';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.css'],
})
export class FuelPage implements OnInit {
  
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

 

constructor(private route: ActivatedRoute, private fuelEntryService: MobileServicesService,private toastCtrl: ToastController ) { }

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
    async addFuelEntry() {
        if (this.fuelEntry.litres < 5 || this.fuelEntry.price_Per_Litre < 10|| this.fuelEntry.total_Spent != (this.fuelEntry.litres * this.fuelEntry.price_Per_Litre) ){
          //toast alert
          let toast = await this.toastCtrl.create({
            message: 'The attempt to add a new fuel entry was unsuccessful',
            duration: 3000,
            position: 'top',
          });
          //display alert
          toast.present();
          this.fuelEntry = {
            fuelEntryId : 0,
            log_Date : new Date(),
            litres : 0,
            price_Per_Litre : 0,
            total_Spent : 0,
            receiptImage :'',
            vehicleId : 0
          }
        }
        else{
          
                this.fuelEntryService.addFuelEntry(this.fuelEntry)
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
                message: 'The fuel entry has successfully been added',
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
          }
        )
    };

  ngOnInit() {
    this.getAllFuelEntries();
  }



}

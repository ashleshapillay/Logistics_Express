import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Fuel } from '../interfaces/fuel';
import { MobileServicesService } from '../services/mobile-services.service';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.page.html',
  styleUrls: ['./fuel-list.page.css'],
})
export class FuelListPage implements OnInit {

  fuelEntries: Fuel[] = [];
  fuelEntry: Fuel = {
    FuelEntryId : 0,
    Log_Date : new Date(),
    Litres : 0,
    Price_Per_Litre : 0,
    Total_Spent : 0,
    ReceiptImage :'',
    VehicleId : 0
  }

  EditView = false; 

constructor(private route: ActivatedRoute, private fuelEntryService: MobileServicesService) { }

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
              FuelEntryId : 0,
              Log_Date : new Date(),
              Litres : 0,
              Price_Per_Litre : 0,
              Total_Spent : 0,
              ReceiptImage :'',
              VehicleId : 0
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
          response => {
           this.fuelEntry = {
            FuelEntryId : 0,
            Log_Date : new Date(),
            Litres : 0,
            Price_Per_Litre : 0,
            Total_Spent : 0,
            ReceiptImage :'',
            VehicleId : 0
            }
            window.location.reload();
          }
        )
    };

  ngOnInit() {
    this.getAllFuelEntries();
  }

  update()
  {

  }

  delete(){
   
  }

}

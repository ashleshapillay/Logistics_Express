import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicle } from 'src/app/modules/vehicle/vehicle.model';
import { VehicleDriver } from 'src/app/modules/vehicle-driver/vehicle-driver.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleDriverService } from 'src/app/services/vehicledriver/vehicle-driver.service';

@Component({
  selector: 'app-vehicle-driver',
  templateUrl: './vehicle-driver.component.html',
  styleUrls: ['./vehicle-driver.component.css']
})
export class VehicleDriverComponent implements OnInit {

  listColumns = ['driver'];
  EditView = false;
  displayMsg = '';
  disable = true;

  vehicleDrivers: VehicleDriver[] = [];
  driver: VehicleDriver = {
    vehicleDriverID: 0,
    vehicleID: 0,
    tripID: 0,
    EmployeeID: 0
  }

  @Input() vehicledrivers: VehicleDriver[] = []
  vehicleID = JSON.parse(localStorage.getItem('vehicleID')!)
  vehicledriver: VehicleDriver = {
    vehicleDriverID: 0,
    vehicleID: this.vehicleID,
    tripID: 0,
    EmployeeID: 0
  }

  addVehicle: any = {
    driver: this.vehicledriver.vehicleDriverID,
    vehicle: this.vehicledriver.vehicleID,
    trip: this.vehicledriver.tripID,
    employee: this.vehicledriver.EmployeeID
  }

  viewDrivers = false;
  AddView = false;

  constructor(private router: Router, private route: ActivatedRoute, private vehicledriverService: VehicleDriverService, private snackBar: MatSnackBar, private vehicleService: VehicleService) { }

  openBar() {
    this.snackBar.open(this.displayMsg, 'Close', {
      duration: 3000
    });
  }

  getAllVehicleDrivers(id: number) {
    this.vehicledriverService.getDriver(id).subscribe(resp => { this.vehicleDrivers = resp })
  }

  // addVehicleDriver() {
  //   this.vehicledriverService.addDriver(this.driver)
  //     .subscribe(
  //       resp => {
  //         this.driver = {
  //           VehicleDriverID: 0,
  //           VehicleID: 0,
  //           TripID: 0,
  //           EmployeeID: 0,
  //         }

  //         this.displayMsg = "A Vehicle Driver Was Added Successfully";
  //         this.openBar();
  //         this.getAllVehicleDrivers();
  //         this.EditView = false
  //         this.AddView = false
  //         window.location.reload()
  //       }
  //     )
  // };

  Back() {
    window.location.reload();
  }

  loadform(drivers: VehicleDriver) {
    this.driver = drivers;
    this.disable = false;
  };

  updateVehicleDriverDetails(drivers: VehicleDriver) {
    this.vehicledriverService.updateDriver(drivers).subscribe(
      resp => {
        this.EditView = true;
        this.displayMsg = "Vehicle Driver details were successfully updated";
        this.openBar();
        window.location.reload();
      }
    )
  };

  deleteVehicleDriver(id: number) {
    this.vehicledriverService.deleteDriver(id).subscribe(resp => {
      this.driver = {
        vehicleDriverID: 0,
        vehicleID: 0,
        tripID: 0,
        EmployeeID: 0
      }

      this.getAllVehicleDrivers(id);
      this.openBar();
      this.displayMsg = "Vehicle Driver Details were removed succesfully";

    })
  }

  Update() {
    this.AddView = false;
    this.EditView = true;
  }

  Add() {
    this.AddView = true;
    this.driver = {
      vehicleDriverID: 0,
      vehicleID: 0,
      tripID: 0,
      EmployeeID: 0
    }
  };

  addDriverDetails() {
    this.addVehicle = {
      driver: this.vehicledriver.vehicleDriverID,
      vehicle: this.vehicledriver.vehicleID,
      trip: this.vehicledriver.tripID,
      employee: this.vehicledriver.EmployeeID
    }

    console.log(this.addVehicle)
    if (this.addVehicle.driver == "" || this.addVehicle.vehicle == "" || this.addVehicle.trip == "" || this.addVehicle.employee == "") {
      this.displayMsg = "Driver cannot be assigned. Please fill in all the required information.";
      this.openBar();
    }
    else {
      this.vehicledriverService.addDriver(this.addVehicle).subscribe(
        resp => {
          this.vehicledriver = {
            vehicleDriverID: 0,
            vehicleID: 0,
            tripID: 0,
            EmployeeID: 0
          }

          this.displayMsg = "Driver was assigned successfully";
          this.openBar();
          this.EditView = false;
          this.AddView = false;
          this.getVehicleDriver(this.vehicleID)

        }
      )
    }
  }

  getVehicleDriver(id: number) {
    this.vehicledriverService.getDriver(id).subscribe(
      res => {
        this.vehicleDrivers = res
      }
    )

  }

  ngOnInit(): void {
  }

}


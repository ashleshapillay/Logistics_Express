import { Component, OnInit, Output } from '@angular/core';
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
    VehicleDriverID: 0,
    VehicleID: 0,
    TripID: 0,
    EmployeeID: 0,
  }

  viewDrivers = false;
  AddView = false;

  constructor(private router: Router, private route: ActivatedRoute, private vehicledriverService: VehicleDriverService, private snackBar: MatSnackBar, private vehicleService: VehicleService) { }

  @Output() vehicles: Vehicle[] = [
    {
      VehicleID: 0,
      TareWeight: '',
      VehicleTypeID: 0,
      VehicleMakeID: 0,
      VehicleModelID: 0,
     
    }
  ];

  openBar() {
    this.snackBar.open(this.displayMsg, 'Close', {
      duration: 3000
    });
  }

  getAllVehicleDrivers() {
    this.vehicledriverService.getDriver().subscribe(resp => { this.vehicleDrivers = resp; })
  }

  addVehicleDriver() {
    this.vehicledriverService.addDriver(this.driver)
      .subscribe(
        resp => {
          this.driver = {
            VehicleDriverID: 0,
            VehicleID: 0,
            TripID: 0,
            EmployeeID: 0,
          }

          this.displayMsg = "A Vehicle Driver Was Added Successfully";
          this.openBar();
          this.getAllVehicleDrivers();
          this.EditView = false
          this.AddView = false
          window.location.reload()
        }
      )
  };

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
        VehicleDriverID: 0,
        VehicleID: 0,
        TripID: 0,
        EmployeeID: 0,
      }

      this.getAllVehicleDrivers();
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
      VehicleDriverID: 0,
      VehicleID: 0,
      TripID: 0,
      EmployeeID: 0,
    }
  };

  getVehicle(id: number) {
    this.vehicleService.getAllVehicles().subscribe(
      resp => {
        this.vehicles = resp;
        this.viewDrivers = true;
        localStorage.setItem('vehicleID', JSON.stringify(id))
      }
    )
  }

  ngOnInit(): void {
  }

}


import { Component, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/modules/vehicle/vehicle.model';
//import { VehicleTypes } from 'src/app/modules/vehiclespecs/vehicletype.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleSpecsService } from 'src/app/services/vehiclespecs/vehicle-specs.service';
import { Employee } from 'src/app/modules/employee/employee.module';
import { VehicleMakes } from 'src/app/modules/vehiclespecs/vehiclemake.model';
import { VehicleModels } from 'src/app/modules/vehiclespecs/vehiclemodel.model';
import { VehicleTypes } from 'src/app/modules/vehiclespecs/vehicletype.model';
import { outputAst } from '@angular/compiler';
import { EmployeeSubService } from 'src/app/services/employee/employee-sub.service';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  listColumns = ['vehicle'];
  EditView = false;
  displayMsg = '';
  disable = true;
  
  vehicleTypes: VehicleTypes[] = [];
  type: VehicleTypes = {
    VehicleTypeID: 0,
    name: '',
    Description: '',
    //VehicleID:0
  }

  vehicleMakes: VehicleMakes[] = [];
  make: VehicleMakes = {
    vehicleMakeID: 0,
    name: '',
    Description: '',
  }

  vehicleModels: VehicleModels[] = [];
  model: VehicleModels = {
    VehicleModelID: 0,
    name: '',
    Description: ''
  }

  vehicles: Vehicle[] = [];
  vehicle: Vehicle = {
    VehicleID: 0,
    TareWeight: '',
    VehicleTypeID: 0,
    VehicleMakeID: 0,
    VehicleModelID: 0,
    // Name: '',
    // Description: ''
  }
  employee: Employee = {
    employeeId: 0,
    phoneNumber: '',
    email: '',
    firstName: '',
    surname: '',
    employeeRoleId: 0
  }

  viewVehicles = false;
  AddView = false;
  AddViewE=false;

  constructor(private router: Router, private route: ActivatedRoute,private empDriver:EmployeeSubService, private vehicleService: VehicleService, private snackBar: MatSnackBar, private specs: VehicleSpecsService) { }

  // @Output() vehicletype: VehicleType[] = [
  //   {
  //     VehicleTypeID: 0,
  //     Name: '',
  //     Description: '',
  //     //VehicleID: this.vehicle.VehicleID
  //   }
  // ];
 VehicleClick(){
   this.router.navigate(['vehicles'])
 }
  VehicleDriverClick(){
    this.router.navigate(['vehicleDriver'])
  }

  VehicleSpecsClick(){
    this.router.navigate(['vehicleSpecs'])
  }

  openBar() {
    this.snackBar.open(this.displayMsg, 'Close', {
      duration: 3000
    });
  }

  getAllVehicles() {
    this.vehicleService.getAllVehicles()
    .subscribe(
      response=>{
        this.vehicles=response;
      }
    );
  }

  addVehicle() {
    this.vehicleService.addVehicle(this.vehicle)
      .subscribe(
        resp => {
          this.vehicle = {
            VehicleID: 0,
            TareWeight: '',
            VehicleTypeID: 0,
            VehicleMakeID: 0,
            VehicleModelID: 0,
            // Name: '',
            // Description: ''
          }

          this.displayMsg = "A Vehicle Was Added Successfully";
          this.openBar();
          this.getAllVehicles();
          this.EditView = false
          this.AddView = false
          window.location.reload()
        }
      )
  };

  loadform(vehicles: Vehicle) {
    this.vehicle = vehicles;
    this.disable = false;

  };

  updateVehicleDetails(vehicles: Vehicle) {
    this.vehicleService.updateVehicle(vehicles).subscribe(
      resp => {
        this.EditView = true;
        this.displayMsg = "Vehicle details were successfully updated";
        this.openBar();
        window.location.reload();
      }
    )
  };

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id).subscribe(resp => {
      this.vehicle = {
        VehicleID: 0,
        TareWeight: '',
        VehicleTypeID: 0,
        VehicleMakeID: 0,
        VehicleModelID: 0,
        // Name: '',
        // Description: ''
      }

      this.getAllVehicles();
      this.openBar();
      this.displayMsg = "Vehicle Details were removed succesfully";

    })
  }

  Update() {
    this.AddView = false;
    this.EditView = true;
  }

  Add() {
    this.AddView = true;
    this.AddViewE=false;
    this.vehicle = {
      VehicleID: 0,
      TareWeight: '',
      VehicleTypeID: 0,
      VehicleMakeID: 0,
      VehicleModelID: 0,
      // Name: '',
      // Description: ''
    }
  };

  AddDriver(){
    this.AddViewE =true;
    this.AddView=false;
    this.EditView=false;
    this.employee ={
      employeeId: 0,
      phoneNumber: '',
      email: '',
      firstName: '',
      surname: '',
      employeeRoleId: 0
    }
  }
  // getType(id: number) {
  //   this.specs.getType(id).subscribe(
  //     resp => {
  //       this.vehicletype = resp;
  //       this.viewVehicles = true;
  //       localStorage.setItem('VehicleTypeID', JSON.stringify(id))
  //     }
  //   )
  // }

  ngOnInit(): void {
    this.getAllVehicles();
  }

}

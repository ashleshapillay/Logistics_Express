import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicle } from 'src/app/modules/vehicle/vehicle.model';
import { VehicleDriver } from 'src/app/modules/vehicle-driver/vehicle-driver.model';
import { VehicleMakes } from 'src/app/modules/vehiclespecs/vehiclemake.model';
import { VehicleModels } from 'src/app/modules/vehiclespecs/vehiclemodel.model';
import { VehicleTypes } from 'src/app/modules/vehiclespecs/vehicletype.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { VehicleSpecsService } from 'src/app/services/vehiclespecs/vehicle-specs.service';

@Component({
  selector: 'app-vehicle-specs',
  templateUrl: './vehicle-specs.component.html',
  styleUrls: ['./vehicle-specs.component.css']
})
export class VehicleSpecsComponent implements OnInit {
  listColumns = ['Name'];
  EditView = false;
  displayMsg = '';
  disable = true;

  vehicleTypes: VehicleTypes[] = [];
  type: VehicleTypes = {
    VehicleTypeID:0,
    name:'',
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

  viewSpecs = false;

  AddViewT = false;
  AddViewMod=false;
  AddViewMak=false;

  constructor(private router: Router, private route: ActivatedRoute, private vehiclespecsService: VehicleSpecsService, private snackBar: MatSnackBar, private vehicleService: VehicleService) { }

  @Output() vehicles: Vehicle[] = [
    {
      VehicleID: 0,
      TareWeight: '',
      VehicleTypeID: this.type.VehicleTypeID,
      VehicleMakeID: this.make.vehicleMakeID,
      VehicleModelID: this.model.VehicleModelID,
      
    }
  ];

  openBar() {
    this.snackBar.open(this.displayMsg, 'Close', {
      duration: 6000
    });
  }

  // get Type
  getAllTypes() {
    this.vehiclespecsService.getAllTypes()
      .subscribe(
        response => {
          this.vehicleTypes = response; 
          console.log(response);
        }
      )
  }  

  //add type
  AddType() {
    this.vehiclespecsService.addType(this.type)
      .subscribe(
        resp => {
          this.type = {
            VehicleTypeID: 0,
            name: '',
            Description: '',
            //VehicleID: 0
          }

          this.displayMsg = "A Vehicle Type Was Added Successfully";
          this.openBar();
          this.getAllTypes();
          this.EditView = false
          this.AddViewT = false
          window.location.reload()
        }
      )
  };

  //delete type
  deleteType(id: number) {
    this.vehiclespecsService.deleteType(id)
      .subscribe(
        response => {
          this.type = {
            VehicleTypeID: 0,
            name: '',
            Description: '',
          }

          this.getAllTypes();
          this.displayMsg = "Vehicle Type Was Removed Successfully";
          this.openBar();
        }
      )
  };

  
  // getVehicleMake(id: number) {
  //   this.vehiclespecsService.getAllMakes().subscribe(resp => { this.vehicleMakes = resp,id})
  // }
  //get make
  getAllMakes() {
    this.vehiclespecsService.getAllMakes()
      .subscribe(
        response => {
          this.vehicleMakes = response;
          console.log(response);
        }
      )
  }  

  //add make
  addMake() {
    this.vehiclespecsService.addMake(this.make)
      .subscribe(
        resp => {
          this.make = {
            vehicleMakeID: 0,
            name: '',
            Description: '',
          }

          this.displayMsg = "A Vehicle Make Was Added Successfully";
          this.openBar();
          this.getAllMakes();
          this.EditView = false
          this.AddViewMak = false
          window.location.reload()
        }
      )
  };

  //delete make
  deleteMake(id: number) {
    this.vehiclespecsService.deleteMake(id)
      .subscribe(
        response => {
          this.make = {
            vehicleMakeID: 0,
            name: '',
            Description: '',
          }

          this.getAllMakes();
          this.displayMsg = "Vehicle Make Was Removed Successfully";
          this.openBar();
        }
      )
  };
  
  //get Model
  getAllModel() {
    this.vehiclespecsService.getAllModel()
      .subscribe(
        response => {
          this.vehicleModels = response;
          console.log(response);
        }
      )
  }  
  VehicleClick(){
    this.router.navigate(['vehicle']);
  }
  //add model
  addModels() {
    this.vehiclespecsService.addModel(this.model)
      .subscribe(
        resp => {
          this.model = {
            VehicleModelID: 0,
            name: '',
            Description: '',
          }

          this.displayMsg = "A Vehicle Model Was Added Successfully";
          this.openBar();
          this.getAllModel();
          this.EditView = false
          this.AddViewMod = false
          window.location.reload()
        }
      )
  };

  //delete model
  deleteModel(id: number) {
    this.vehiclespecsService.deleteModel(id)
      .subscribe(
        response => {
          this.model = {
            VehicleModelID: 0,
            name: '',
            Description: '',
          }

          this.getAllModel();
          this.displayMsg = "Vehicle Model Was Removed Successfully";
          this.openBar();
        }
      )
  };


  

  DeleteType() {
    this.AddViewT = false;
    this.EditView = true;
  }
  DeleteMake() {
    this.AddViewMak = false;
    this.EditView = true;
  }
  DeleteModel() {
    this.AddViewMod = false;
    this.EditView = true;
  }
  AddAType() {
    this.AddViewT = true;
    this.AddViewMak=false;
    this.AddViewMod=false;
    this.type = {
      VehicleTypeID: 0,
      name: '',
      Description: '',
      //VehicleID: 0
    }
  };

  AddAModel() {
    this.AddViewMod = true;
    this.AddViewT=false;
    this.AddViewMak=false;
    this.model = {
      VehicleModelID: 0,
      name: '',
      Description: ''
      
    }
  };
  AddAMake() {
    this.AddViewMak = true;
    this.AddViewT = false;
    this.AddViewMod=false;
    this.make = {
      vehicleMakeID: 0,
      name: '',
      Description: ''
    }
  };


 loadformT(types: VehicleTypes) {
    this.type = types;
    this.disable = false;
    console.log(types);
  };
  loadformMak(makes: VehicleMakes) {
    this.make = makes;
    this.disable = false;
    console.log(makes);
    
  };
  loadformMod(models: VehicleModels) {
    this.model = models;
    this.disable = false;
    console.log(models);
  };

  getVehicle(id: number) {
    this.vehicleService.getVehicle(id).subscribe(
      resp => {
        this.vehicles = resp;
        this.viewSpecs = true;
        localStorage.setItem('VehicleID', JSON.stringify(id))
      }
    )
  }

  ngOnInit(): void {
    this.getAllTypes();
    this.getAllMakes();
    this.getAllModel();
  }

}
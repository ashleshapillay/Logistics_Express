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
import { VehicleDriver } from 'src/app/modules/vehicle-driver/vehicle-driver.model';
import { outputAst } from '@angular/compiler';
// import { ModalService} from 'carbon-components-angular'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { VehicleDriverService } from 'src/app/services/vehicledriver/vehicle-driver.service';
import { VehicleSpecsComponent } from '../vehicle-specs/vehicle-specs.component';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})

export class VehicleComponent implements OnInit {

  listColumns = ['vehicle'];
  EditView = false;
  displayMsg = '';
  str = '';
  disable = true;
  closeResult = '';

  vehicleTypes: VehicleTypes[] = [];
  type: VehicleTypes = {
    vehicleTypeID: 0,
    name: '',
    description: '',
    //VehicleID:0
  }

  vehicleMakes: VehicleMakes[] = [];
  make: VehicleMakes = {
    vehicleMakeID: 0,
    name: '',
    description: '',
  }

  vehicleModels: VehicleModels[] = [];
  model: VehicleModels = {
    vehicleModelID: 0,
    name: '',
    description: ''
  }

  vehicles: Vehicle[] = [];
  vehicle: Vehicle = {
    vehicleID: 0,
    TareWeight: '',
    vehicleTypeID: 0,
    vehicleMakeID: 0,
    vehicleModelID: 0,
    // Name: '',
    // Description: ''
  }
  employee: Employee = {
    EmployeeId: 0,
    Emp_PhoneNumber: '',
    Emp_Email: '',
    Emp_Contact: '',
    Emp_FirstName: '',
    Emp_LastName: '',
    EmployeeRoleId: 0
  }

  viewVehicles = false;
  AddView = false;
  AddViewE = false;

  constructor(private router: Router, private modalService: NgbModal, private route: ActivatedRoute, private empDriver: EmployeeService, private vehicleService: VehicleService, private snackBar: MatSnackBar, private specs: VehicleSpecsService, private driverService: VehicleDriverService) { }

  @Output() driver: VehicleDriver[] = [
    {
      vehicleDriverID: 0,
      vehicleID: 0,
      tripID: 0,
      EmployeeID: 0
    }
  ];
  VehicleClick() {
    this.router.navigate(['vehicles'])
  }

  VehicleDriverClick() {
    this.router.navigate(['vehicleDriver'])
  }

  VehicleSpecsClick() {
    this.router.navigate(['vehicleSpecs'])
  }

  // get Type
  getAllTypes() {
    this.specs.getAllTypes()
      .subscribe(
        response => {
          this.vehicleTypes = response;
          console.log(response);
        }

      )
    //window.location.reload();
  }

  //adding a new type
  AddNewType(content: any, name: string) {
    this.specs.addType(this.type).subscribe(
      resp => {
        this.type = {
          vehicleTypeID: 0,
          name: '',
          description: '',
        }
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        // this.displayMsg = "A Vehicle Type was Added Successfully!";
        // this.openBar();
        // this.getAllTypes();

      }
    )
  }

  ChooseNewMake(content: any, name: string) {
    this.specs.addMake(this.make).subscribe(
      resp => {
        this.make = {
          vehicleMakeID: 0,
          name: '',
          description: '',
        }

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = 'Closed with: '
        })
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  openBar() {
    this.snackBar.open(this.displayMsg, 'Close', {
      duration: 3000
    });
  }

  getAllVehicles() {
    this.vehicleService.getAllVehicles()
      .subscribe(
        response => {
          this.vehicles = response;
        }
      );
  }

  addVehicle() {
    this.vehicleService.addVehicle(this.vehicle)
      .subscribe(
        resp => {
          this.vehicle = {
            vehicleID: 0,
            TareWeight: '',
            vehicleTypeID: 0,
            vehicleMakeID: 0,
            vehicleModelID: 0,
            // Name: '',
            // Description: ''
          }

          this.displayMsg = "A Vehicle Was Added Successfully";
          this.openBar();
          this.getAllVehicles();
          this.EditView = false
          this.AddView = false
         // window.location.reload()
        }
      )
  };

  loadform(vehicles: Vehicle) {
    this.vehicle = vehicles;
    this.disable = false;
    this.getAllTypes();
  };

  updateVehicleDetails(vehicles: Vehicle) {
    this.vehicleService.updateVehicle(vehicles).subscribe(
      resp => {
        this.EditView = true;
        this.displayMsg = "Vehicle details were successfully updated";
        this.openBar();
        //window.location.reload();
      }
    )
  };

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id).subscribe(resp => {
      this.vehicle = {
        vehicleID: 0,
        TareWeight: '',
        vehicleTypeID: 0,
        vehicleMakeID: 0,
        vehicleModelID: 0,
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
    this.AddViewE = false;
    this.vehicle = {
      vehicleID: 0,
      TareWeight: '',
      vehicleTypeID: 0,
      vehicleMakeID: 0,
      vehicleModelID: 0,
      // Name: '',
      // Description: ''
    }
  };

  AddDriver() {
    this.AddViewE = true;
    this.AddView = false;
    this.EditView = false;
    this.employee = {
      EmployeeId: 0,
      Emp_PhoneNumber: '',
      Emp_Email: '',
      Emp_Contact: '',
      Emp_FirstName: '',
      Emp_LastName: '',
      EmployeeRoleId: 0
    }
  }

  getVehicleDriverID(id: number) {
    this.driverService.getDriver(id).subscribe(
      resp => {
        this.driver = resp;
        this.viewVehicles = true;
        localStorage.setItem('VehicleID', JSON.stringify(id))
      }
    )
  }

  ngOnInit(): void {
    this.getAllVehicles();
    this.getAllTypes();
    this.specs.getAllMakes();
    this.specs.getAllModel();

  }

}

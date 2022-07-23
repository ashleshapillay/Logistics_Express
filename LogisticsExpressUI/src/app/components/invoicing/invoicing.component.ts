import { Component, OnInit } from '@angular/core';
import { DeliveryNote } from 'src/app/modules/invoicing/deliverynote.module';
import { Invoice } from 'src/app/modules/invoicing/invoice.module';
import { Quotation } from 'src/app/modules/quotation/quote';
import { Vehicle } from 'src/app/modules/vehicle/vehicle.model';
import { Input, Output, EventEmitter } from '@angular/core';
import { DeliverynoteService } from 'src/app/services/invoicing/deliverynote.service';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent implements OnInit {

  viewInvDocs = false;
  disable = true;
  listColumns = ['dNote'];
  ViewNote = false;

dNotes: DeliveryNote[]=[];

dNote: DeliveryNote = {
  deliveryNoteID: 0,
  deliveryID: 0,
  quotationID: 0,
  dateSubmitted: new Date(),
   
   cosginee:'',
    deliverTo:'',
    collectFrom: '',
    quantity:0,
    weight:0,
    description:'',
    receivedQuality: true,
    driverName:'',
    vehReg:'',
    printName:'',
    trailerReg:'',
    time: new Date()
    //pod_image: "",
    //signature:''
}



// quotes: Quotation []= [];
// quote: Quotation = {
//   total_price:0,
//   date_issued: new Date(),
//   vatID:0,
//   customerID: 0,
//   addressID: 0
// }



invoices: Invoice[]=[];
invoice: Invoice = {
  dateIssued: new Date(),
  invoiceNumber:0,
  loadConfirmationID:0
}

  constructor(private noteService: DeliverynoteService ) { }

  loadform(dNotes: DeliveryNote){
    this.dNote=dNotes;
    this.disable = false;
  }

  getDeliveryNote(id:number){
    this.noteService.getDeliveryNote(id).subscribe(
      response => {
        this.dNotes=response;
      }
    )

    this.viewInvDocs=true;
  }

  getAllDeliveryNote(){
    this.noteService.getAllDeliveryNotes()
    .subscribe(
      response => {
        this.dNotes = response;
  }
)

  }

  ngOnInit(): void {
    this.getAllDeliveryNote();
  }

}

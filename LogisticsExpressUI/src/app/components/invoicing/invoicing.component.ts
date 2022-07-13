import { Component, OnInit } from '@angular/core';
import { DeliveryNote } from 'src/app/modules/Invoicing/deliverynote.module';
import { Invoice } from 'src/app/modules/Invoicing/invoice.module';

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
  //pod_image: "" 
}

invoices: Invoice[]=[];
invoice: Invoice = {
  dateIssued: new Date(),
  invoiceNumber:0,
  loadConfirmationID:0
}

  constructor() { }

  loadform(dNotes: DeliveryNote){
    this.dNote=dNotes;
    this.disable = false;
  }

  getDeliveryNote(id:number){
   
  }
  ngOnInit(): void {
  }

}

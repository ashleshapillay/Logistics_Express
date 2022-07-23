import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/modules/customers/customers.module';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { Quotes } from 'src/app/modules/quotes/quotes';
import { Router } from '@angular/router';
import { LocationserviceService } from 'src/app/services/locations/locationservice.service';
import { Address } from 'src/app/modules/locationmodules/address.module';

@Component({
  selector: 'app-request-quote',
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.css']
})
export class RequestQuoteComponent implements OnInit {

  customers: Customer[] = [];
  customer: Customer = {
    customerId: 0,
    businessName: '',
    emailAddress: '',
    phoneNumber: ''
  }


  quotes: Quotes[] = [];
  quote: Quotes = {
      quoteId:0,
      customerId:0,
      description:"",
      dropOffAddress:"",
      pickUpAddress:"",
      quote_Date: new Date(), 
      rate:0
  }


  addresses: Address[] = [];
  address: Address = {
    addressId: 0,
    streetNumber: 0,
    streetName: '',
    suburbId: 0,
  }
  
  edit: boolean = false; 

  constructor(private customerService: CustomersService,
    private quoteService: QuoteService,
    private addressService: LocationserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllAddress();  
  }


  getAllCustomers() {
    this.customerService.getAllCustomers()
      .subscribe(
        response => {
          this.customers = response;
        }
      )
   }


   getAllAddress() {
    this.addressService.getAllAddresses()
      .subscribe(
        response => {
          this.addresses = response;
        }
      )
   }


   addQuote(){
    this.quoteService.addQuotes(this.quote)
       .subscribe(
          response => {
                 this.generate();
              }
       )
   }
    


   generate(){
    this.router.navigate(["dashboard"]);
   }
  
}

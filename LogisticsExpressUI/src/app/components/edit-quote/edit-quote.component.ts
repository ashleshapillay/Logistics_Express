import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/modules/customers/customers.module';
import { Address } from 'src/app/modules/locationmodules/address.module';
import { Quotes } from 'src/app/modules/quotes/quotes';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { LocationserviceService } from 'src/app/services/locations/locationservice.service';
import { QuoteService } from 'src/app/services/quote/quote.service';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.css']
})
export class EditQuoteComponent implements OnInit {

  customers: Customer[] = [];
  customer: Customer = {
    customerId: 0,
    businessName: '',
    emailAddress: '',
    phoneNumber: ''
  }


  quotes: Quotes[] = [];
  quote: Quotes = {
    quoteId: 0,
    customerId: 0,
    description: "",
    dropOffAddress: "",
    pickUpAddress: "",
    quote_Date: new Date(),
    rate: 0
  }


  addresses: Address[] = [];
  address: Address = {
    addressId: 0,
    streetNumber: 0,
    streetName: '',
    suburbId: 0,
  }

  edit: boolean = false;

  currentQuote = JSON.parse(localStorage.getItem('quoteId')!)

  constructor(private customerService: CustomersService,
    private quoteService: QuoteService,
    private addressService: LocationserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllAddress();
    this.getCurrentQuoteInfo();
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

  getCurrentQuoteInfo() {
    this.quoteService.getQuote(this.currentQuote)
      .subscribe(
        response => {
          this.quote.customerId = response[0].customerId
          this.quote.description = response[0].description
          this.quote.dropOffAddress = response[0].dropOffAddress
          this.quote.pickUpAddress = response[0].pickUpAddress
          this.quote.rate = response[0].rate
          this.quote.quote_Date = response[0].quote_Date
          this.quote.quoteId = response[0].quoteId
        }
      )
  }


  updateQuote(){
    this.quoteService.updateQuotes(this.quote)
    .subscribe (
      response => {
          this.exit();
      }
    )
  }

  exit(){
    localStorage.removeItem('quoteId')
    this.router.navigate(["dashboard"]);
  }

}

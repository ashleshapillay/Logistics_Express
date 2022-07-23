import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/modules/customers/customers.module';
import { Quotes } from 'src/app/modules/quotes/quotes';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { QuoteService } from 'src/app/services/quote/quote.service';

@Component({
  selector: 'app-outstanding-quotes',
  templateUrl: './outstanding-quotes.component.html',
  styleUrls: ['./outstanding-quotes.component.css']
})
export class OutstandingQuotesComponent implements OnInit {
  displayedColumns = ['Date', 'Customerid', 'Rate', 'Accept','Reject', 'View', 'Edit'];

  quotes : Quotes[] =[];

  quote: Quotes = {
    customerId:0,
    description: "",
    dropOffAddress: "",
    pickUpAddress: "",
    rate:0,
    quoteId:0,
    quote_Date: new Date()
  }

  customers: Customer[] = [];
  customer: Customer = {
    customerId: 0,
    businessName: '',
    emailAddress: '',
    phoneNumber: ''
  }

  currentQuote = JSON.parse(localStorage.getItem('quoteId')!)

  constructor(private quoteService: QuoteService, 
    private router: Router,
    private customerService: CustomersService)  { }

  ngOnInit(): void {
    this.getQuotes()
   this.getCustomer()
}

 getQuotes()
 {
  this.quoteService.getAllQuotes()
  .subscribe(
    response => {
      this.quotes = response;
    }
  )
 }
 
 createQuote(){
  this.router.navigate(["request-quote"]);
 }

 deleteQuote(id: number){    
   this.quoteService.deleteQuotes(id)
   .subscribe(
      response => {
        window.location.reload();
        
      }
   ) }
  

setQuoteNumber(id: number){
  const jsonData = JSON.stringify(id)
  localStorage.setItem('quoteId', jsonData)
}

viewQuote(id:number){
  this.setQuoteNumber(id)
  this.router.navigate(["quote"]);
}
 
editQuote(id: number){
  this.setQuoteNumber(id)
  this.router.navigate(["edit-quote"]);
}
 
getCustomer(){
  this.customerService.getAllCustomers()
  .subscribe(
    response => {
        this.customers = response
        console.log(this.customers)
    }
  )
}


}

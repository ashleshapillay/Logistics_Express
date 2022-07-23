import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { Quotes } from 'src/app/modules/quotes/quotes';
import { Quote } from '@angular/compiler';
import { Router } from '@angular/router';
import { Customer } from 'src/app/modules/customers/customers.module';
import { CustomersService } from 'src/app/services/customers/customers.service';



@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {


 currentQuote = JSON.parse(localStorage.getItem('quoteId')!)

  quotes : Quotes[] =[];

  quote: Quotes = {
    customerId:0,
    description: "",
    dropOffAddress: "",
    pickUpAddress: "",
    rate:0,
    quoteId:0,
    quote_Date:new Date()
  }

  customers: Customer[] = [];
  customer: Customer = {
    customerId: 0,
    businessName: '',
    emailAddress: '',
    phoneNumber: ''
  }


  constructor(private quoteService: QuoteService,
    private router: Router,
    private customerService: CustomersService) { }

  ngOnInit(): void {     
     this.getCurrentQuoteInfo()
  }

  getCurrentQuoteInfo(){
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


             this.customerService.getCustomer(this.quote.customerId)
             .subscribe(
               response => {
                   this.customer = response
               }
             )
        }
      )
  }


  openPDF(){
    let Data = document.getElementById('htmlData')!;
    // Canvas Options
    html2canvas(Data).then((canvas) => {

      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('pdf');
    
        let PDF = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4'
        });

        let topPosition = 10;
        let leftPosition = 0;

        PDF.addImage(contentDataURL, 'pdf', leftPosition, topPosition, fileWidth, fileHeight);
        PDF.save('Quote.pdf');

    });

    localStorage.removeItem('quoteId')
  }


  back(){
    localStorage.removeItem('quoteId')
    this.router.navigate(["dashboard"]);
  }


}

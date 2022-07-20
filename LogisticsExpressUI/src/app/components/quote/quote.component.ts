import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { Quotes } from 'src/app/modules/quotes/quotes';



@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {


  @Input() currentQuote: Quotes[] =[];

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


  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
      this.getQuotes()
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
        PDF.save('Graph.pdf');

    });
  }

}

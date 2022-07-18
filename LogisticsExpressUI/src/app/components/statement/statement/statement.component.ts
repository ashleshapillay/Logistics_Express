import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/*import jsPDF from 'jspdf';
import html2canvas from 'html2canvas' */


@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  searchText: any;
  heroes = [
    {Date: "14/07", Details: "Reitu", Amount: "50"},
    {Date: "15/07", Details: "Reitooo", Amount: "300"},
    {Date: "16/07", Details: "Tumi", Amount: "1000"},
    {Date: "17/07", Details: "Reitumetse Makgatho", Amount: "20"}

  ];

  AddView = false;

  AddStatement(){
    this.AddView = true; 
  }

  //@ViewChild('htmlData') htmlData:ElementRef | any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  //PDF Download 

  /*
    public openPDF(){
  let Data = document.getElementById('htmlData')!; //if only have up to this line then it won't work because the dimensions haven't been specified 

  html2canvas(Data).then(canvas => {
    let fileWidth = 210;
    let fileHeight = canvas.height * fileWidth / canvas.width;

    const contentDataUrl = canvas.toDataURL('image/png'); //enables us to download and convert to image 

    //working specifically working with a pdf element 
    let PDF = new jsPDF({   
      orientation: 'p', //p = portrait
      unit: 'mm',
      format: 'a4'
    });

    //few other things that can specifiy 
    let topPosition = 10;
    let leftPosition = 0;

    PDF.addImage(contentDataUrl, 'PNG', leftPosition, topPosition, fileWidth, fileHeight); //including specifications (order is important)
    PDF.save('Graph.pdf'); //what we want it to be saved as 
  }  
  */

  ngOnInit(): void {
  }

}

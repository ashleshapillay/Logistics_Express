import { Component, OnInit } from '@angular/core';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})

export class DemoComponent implements OnInit {
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


  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    console.log();
  }

}

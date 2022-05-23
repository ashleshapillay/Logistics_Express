import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
  }

  CustomerClick(){
    this.router.navigate(["customers"]);
  }

  LocationClick(){
    this.router.navigate(["countries"]);
  }

  dashboardClick(){
    this.router.navigate(["repair-requests"]);
  }

  SubcontractorClick(){
    this.router.navigate(["subcontractor"]);
  }

  Employee(){
    this.router.navigate(["employeerole"]);
  }
}

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthenicationService } from 'src/app/services/authenication/authenication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnDestroy{
  
  isUserLoggedIn: boolean= false; 
  
  private readonly _destroy = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration , 
  private msalBroadCastService: MsalBroadcastService, 
  private authService: MsalService,
  private authenicationService: AuthenicationService,
    private router: Router,
    private route: ActivatedRoute){}

    
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

  logout() {
    this.authService.logoutRedirect({postLogoutRedirectUri: environment.postLogoutUrl});
 }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete(); 
  }
}

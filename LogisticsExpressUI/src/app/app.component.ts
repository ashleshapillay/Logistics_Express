import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenicationService } from './services/authenication/authenication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {


  isUserLoggedIn: boolean= false; 
  
  private readonly _destroy = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration , 
  private msalBroadCastService: MsalBroadcastService, 
  private authService: MsalService,
  private authenicationService: AuthenicationService,
    private router: Router,
    private route: ActivatedRoute){}

    ngOnInit(): void {
      this.msalBroadCastService.inProgress$.pipe
      (filter((interactionStatus: InteractionStatus) =>
       interactionStatus == InteractionStatus.None),
       takeUntil(this._destroy))
       .subscribe( X => 
        {
           this.isUserLoggedIn = this.authService.instance.getAllAccounts().length >0
           this.authenicationService.isUserLoggedIn.next(this.isUserLoggedIn)
        }
       )
    }
  
   ngOnDestroy(): void {
       this._destroy.next(undefined);
       this._destroy.complete(); 
    }
  
    login(){
       
      if(this.msalGuardConfig.authRequest)
      {
         this.authService.loginRedirect({...this.msalGuardConfig.authRequest } as RedirectRequest)
      }
      else
      {
         this.authService.loginRedirect();
      }
    }
  
    logout() {
       this.authService.logoutRedirect({postLogoutRedirectUri: environment.postLogoutUrl});
    }
}


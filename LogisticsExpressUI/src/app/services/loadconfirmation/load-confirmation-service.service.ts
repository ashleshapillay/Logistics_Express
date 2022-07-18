import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadConfirmation } from '../Modules/loadconfirmation';

@Injectable({
  providedIn: 'root'
})
export class LoadConfirmationServiceService {

  //base URL's
  loadConfirmationUrl = 'https://localhost:7031/api/LoadConfirmation';

  constructor(private http: HttpClient) { }

    //get all 
    GetAllLoadConfirmations(): Observable<LoadConfirmation[]>{ 
      return  this.http.get<LoadConfirmation[]>(this.loadConfirmationUrl)
     }
     //get a single 
     GetLoadConfirmation(id: Number):Observable<LoadConfirmation>{
      return this.http.get<LoadConfirmation>(this.loadConfirmationUrl + '/' + id)
    }
    //add 
    addLoadConfirmation(loadConfirmationDetail:LoadConfirmation):Observable<LoadConfirmation>{
      return this.http.post<LoadConfirmation>(this.loadConfirmationUrl,loadConfirmationDetail);
    }
    //update 
    updateLoadConfirmation(loadConfirmationDetail: LoadConfirmation): Observable<LoadConfirmation>{
      return  this.http.put<LoadConfirmation>(this.loadConfirmationUrl + '/'+ loadConfirmationDetail.LoadConfirmationID, loadConfirmationDetail);
    }
    //delete 
    deleteLoadConfirmation(id: Number): Observable<LoadConfirmation>{
      return  this.http.delete<LoadConfirmation>(this.loadConfirmationUrl + '/'+ id);
    }

}

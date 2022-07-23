import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quotes } from 'src/app/modules/quotes/quotes';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  baseUrl = 'https://localhost:7013/api/Quotes';

  constructor(private http: HttpClient) { }

  getAllQuotes(): Observable<Quotes[]>{
    return  this.http.get<Quotes[]>(this.baseUrl)
   }

  getQuote(id: Number):Observable<Quotes[]>{
    return this.http.get<Quotes[]>(this.baseUrl + '/' + id)
  }
  //add new Quotes
  addQuotes(quotes:Quotes):Observable<Quotes>{
    return this.http.post<Quotes>(this.baseUrl,quotes);
  }
  //update a Quotes
  updateQuotes(quotes: Quotes): Observable<Quotes>{
    return  this.http.put<Quotes>(this.baseUrl + '/'+ quotes.quoteId, quotes);
  }
  //delete a Quotes
  deleteQuotes(id: Number): Observable<Quotes>{
    return  this.http.delete<Quotes>(this.baseUrl + '/'+ id);
  }

}

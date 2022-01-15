import { Injectable } from '@angular/core';
import { Book } from '../book-service/book.model'
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class BestService {
  selectedBook: Book;
  Book: Book[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/best_selling';
  getBookBestSelling() { 
    return this._http.get(this.baseURL+'/Book');
  }
  getBookOnCategoryBuyMostByUserID(userID) { 
    return this._http.get(this.baseURL+'/BookByCategory/'+userID);
  }
  getTop10CategoryAndAuthor(){
    return this._http.get(this.baseURL+'/Top10');
  }
  getSomeNewSomeBuySomeRateBest(){
    return this._http.get(this.baseURL+'/getSomeNewSomeBuySomeRateBest');
  }

}

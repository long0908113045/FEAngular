import { Injectable } from '@angular/core';
import { Book } from '../book-service/book.model'
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class Recommend {
  selectedBook: Book;
  Book: Book[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host();

  getAllRecommendByUserID(userID) { 
    console.log(11321312)
    return this._http.get(this.baseURL+'/datasetRecommend/Data/'+userID);
  }  
}

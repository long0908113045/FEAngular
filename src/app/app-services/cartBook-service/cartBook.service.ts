import { Injectable } from '@angular/core';
import { CartBook } from './cartBook.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class CartBookService {
  selectedCartBook: CartBook;
  cartBook: CartBook[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/cartBooks';
  getCartBookList() {
    return this._http.get(this.baseURL);
  }
  putCartBook(cartBook: CartBook) {
    return this._http.post(this.baseURL+"/updateCartBook",cartBook);
  }
  getCartBookById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postCartBook(cartBook: CartBook) {
    return this._http.post(this.baseURL, cartBook);
  }
  //delete One CartBook
  deleteOneCartBook(cartBook: CartBook) {
    return this._http.post(this.baseURL +"/deleteOneCartBook",cartBook);
  }
  //delete all by userID
  deleteAllCartBookByUserID(_id: string) {
    return this._http.delete(this.baseURL+ "/deleteByUserID" + `/${_id}`);
  }
  //get all cartbookDB by userID
  getAllCartBookDBByUserID(_id: string){
    return this._http.get(this.baseURL+ "/getAllCartBookByUserID" + `/${_id}`);
  }
  
}

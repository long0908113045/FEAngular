import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import{HostService} from '../aHost/Host.service';
import { BookFiter } from './bookfilter.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  selectedBook: Book;
  book: Book[];
  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/books';
  getBookList() {
    return this._http.get(this.baseURL);
  }
  putBook(book: Book) {
    return this._http.put(this.baseURL + `/${book._id}`,this.selectedBook);
  }
  getBookById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postBook(book: Book) {
    return this._http.post(this.baseURL, book);
  }
  deleteBook(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
  getBookByCategoryId(category_id: string) {
    return this._http.get(this.baseURL +"/findbycategory"+ `/${category_id}`);
  }
  getBookByAuthorId(author_id: string) {
    return this._http.get(this.baseURL +"/findbyauthor"+ `/${author_id}`);
  }
  getBookByPrice(body: any) {
    return this._http.post(this.baseURL +"/price", body);
  }
  filterBook(body: any) {
    return this._http.post(this.baseURL +"/filter", body);
  }
  //Update Book Quantity
  //trong function backend đã trừ ... (a - b)
  UpdateQuantity(body: any){
    return this._http.post(this.baseURL +"/CheckBillBeforePay", body);
  }
  getBookSale(){
    return this._http.get(this.baseURL+"/getBookSale/get");
  }

  updateSalePromotion(){

    return this._http.get(this.baseURL+"/UpdateByBookIDAndSale/Update")
  }


  //chec list book exist
  CheckExistListBookID(body:any){
    return this._http.post(this.baseURL+"/CheckExistListBookID",body)
  }
}

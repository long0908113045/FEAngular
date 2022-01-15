import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/statistic';
  getFourBooksBuyTheMost() {
    return this._http.get(this.baseURL+'/FourBookBuyTheMost');
  }
  getBooksBuyTheMost() {
    return this._http.get(this.baseURL+'/BuyTheMost');
  }
  getBooksBuyTheMostOnWeek() {
    return this._http.get(this.baseURL+'/BookBuyTheMostOnWeek');
  }
  getBooksBuyTheMostOnMonth() {
    return this._http.get(this.baseURL+'/BookBuyTheMostOnMonth');
  }
  getBooksBuyTheMostOnYear() {
    return this._http.get(this.baseURL+'/BookBuyTheMostOnYear');
  }
  TotalPriceOnWeek(){
    return this._http.get(this.baseURL+'/TotalPriceOnWeek');
  }
  TotalPriceOnMonth(body: any){
    return this._http.post(this.baseURL+'/TotalPriceOnMonth', body);
  }
  TotalPriceOnYear(yearCheck){
    return this._http.get(this.baseURL+'/TotalPriceOnYear/'+yearCheck);
  }
  BestUserOnYear(yearCheck){
    return this._http.get(this.baseURL+'/BestUser/'+yearCheck);
  }
  BestUserOnMonth(body: any){
    return this._http.post(this.baseURL+'/BestUserOnMonth', body);
  }
  TotalPriceOnEachMonth(body: any){
    return this._http.post(this.baseURL+'/TotalPriceOnEachMonth',body);
  }
}

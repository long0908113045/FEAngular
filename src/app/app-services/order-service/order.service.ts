import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  selectedOrder: Order;
  order: Order[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/orders';
  readonly baseURLMomo = this._host.host()+'/paymentMomo'
  getOrderList() {
    return this._http.get(this.baseURL);
  }
  putOrder(order: Order) {
    return this._http.put(this.baseURL + `/${order._id}`,order);
  }
  getOrderById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postOrder(order: Order) {
    return this._http.post(this.baseURL, order);
    
  }
  deleteOrder(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
  getOrderByUserId(_id: String){
    return this._http.get(this.baseURL+"/findByUserID"+ `/${_id}`);
  }
}

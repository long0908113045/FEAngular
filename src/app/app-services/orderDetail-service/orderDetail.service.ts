import { Injectable } from '@angular/core';
import { OrderDetail } from './orderDetail.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  selectedOrderDetail: OrderDetail;
  orderDetail: OrderDetail[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/orderDetails';
  getOrderDetailList() {
    return this._http.get(this.baseURL);
  }
  putOrderDetail(orderDetail: OrderDetail) {
    return this._http.put(this.baseURL + `/${orderDetail._id}`,orderDetail);
  }
  getOrderDetailById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postOrderDetail(orderDetail: OrderDetail) {
    return this._http.post(this.baseURL, orderDetail);
  }
  deleteOrderDetail(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
  
}

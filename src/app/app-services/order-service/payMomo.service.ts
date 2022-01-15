import { SendMail } from './../sendMail-service/sendMail.model';
import { OrderDetail } from './../orderDetail-service/orderDetail.model';

import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class payMomoService {
  selectedOrder: Order;
  order: Order[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/paymentMoMo';
  
  postPayMoMo(order:Order, ArrayOrder:OrderDetail[] , sendMail:SendMail) {
    return this._http.post(this.baseURL, {order:order,orderDetails:ArrayOrder,sendMail:sendMail});
  }
  updateQuality(orderDetail: OrderDetail){
    return this._http.post(this.baseURL + "/updateQuality",orderDetail);
  }
}
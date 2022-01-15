import { Injectable } from '@angular/core';
import { Customer } from './Customer.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  selectedCustomer: Customer;
  customer: Customer[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/customers';
  getCustomerList() {
    return this._http.get(this.baseURL);
  }
  putCustomer(customer: Customer) {
    return this._http.put(this.baseURL + `/${customer._id}`,customer);
  }
  getCustomerById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postCustomer(customer: Customer) {
    return this._http.post(this.baseURL, customer);
    
  }
  deleteCustomer(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
  getCustomerByUserID(_id: String) {
    return this._http.get(this.baseURL + "/UserID/" + _id);
  }
  //get userID by customerID
  getUserIDByCustomerID(_id:String){
    return this._http.get(this.baseURL+ "/getUserIDByCustomerID/" + _id);
  }

}

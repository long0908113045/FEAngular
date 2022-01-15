import { Injectable } from '@angular/core';
import { DiscountCode } from './discountCode.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {
  selectedDiscountCode: DiscountCode;
  discountCode: DiscountCode[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/discountCodes';
  getDiscountCodeList() {
    return this._http.get(this.baseURL);
  }
  putDiscountCode(discountCode: DiscountCode) {
    return this._http.put(this.baseURL + `/${discountCode._id}`,discountCode);
  }
  getDiscountCodeById(_id: String) {
    return this._http.get(this.baseURL + "/" + `/${_id}`);
  }
  postDiscountCode(discountCode: DiscountCode) {
    return this._http.post(this.baseURL, discountCode);
  }
  deleteDiscountCode(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
  //get discountCode By UserID
  getDiscountCodeByUserID(_id: string){
    return this._http.get(this.baseURL + "/findByUserID"+`/${_id}`);
  }
  //get discountCOde By UserID && status = 0 ( chưa dùng)
  getDiscountCodeByUserIDAndStatus(_id:string){

    return this._http.get(this.baseURL + "/findByUserIDANDStatus"+`/${_id}`);
  }
  
}

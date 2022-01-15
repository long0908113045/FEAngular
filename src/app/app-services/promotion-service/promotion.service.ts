import { Injectable } from '@angular/core';
import { Promotion } from './promotion.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  selectedPromotion: Promotion;
  promotion: Promotion[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/promotions';
  getPromotionList() {
    return this._http.get(this.baseURL);
  }
  putPromotion(promotion: Promotion) {
    return this._http.put(this.baseURL + `/${promotion._id}`,promotion);
  }
  getPromotionById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postPromotion(promotion: Promotion) {
    return this._http.post(this.baseURL, promotion);
    
  }
  deletePromotion(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
 getTop3Promotion(){
   return this._http.get(this.baseURL+"/Top3/3PromotionShow");
 
  }
  UpdateIsShow(id){
    console.log(id)
    return this._http.get(this.baseURL+ "/updateIsShow" +`/${id}`)
  }
  getManagerPromotion(){
    return this._http.get(this.baseURL+"/managerPromotionGet/GetAll");
  }
}

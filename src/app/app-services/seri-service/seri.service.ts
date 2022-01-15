import { Injectable } from '@angular/core';
import { Seri } from './seri.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class SeriService {

  series: Seri[];
  seri: Seri
  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/series';
  getSeriList() {
    return this._http.get(this.baseURL);
  }
  putSeri(seri: Seri) {
    return this._http.put(this.baseURL + `/${seri._id}`,seri);
  }
  getSeriById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postSeri(seri: Seri) {
    return this._http.post(this.baseURL, seri);
  }
  deleteSeri(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
}

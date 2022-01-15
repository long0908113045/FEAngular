import { Injectable } from '@angular/core';
import { HostService } from '../aHost/Host.service';
import { Segment } from './segment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  segment: Segment
  constructor(private _http: HttpClient, private _host: HostService) { }
    readonly baseURL = this._host.host() + '/segments';
    getSegments() {
        return this._http.get(this.baseURL);
    }
    getSegmentsByID(id: String) {
      return this._http.get(this.baseURL+ '/'+id);
    }
    postSegment(array:any) {
        return this._http.post(this.baseURL, array);
    }
    deleteSegment(id: String) {
      return this._http.delete(this.baseURL + '/' +id);
  }
  checkActiveExistTrue(){
    return this._http.get(this.baseURL+"/getAll/FindActive");
  }
  //đưa toàn bộ active về false
  updateAllActiveToFalse(){
    return this._http.get(this.baseURL+"/getAll/UpdateALL/ActiveFalse");
  }
  updateAToTrue(id){
    return this._http.get(this.baseURL + '/getAll/UpdateTrue/' +id);
  }
  updateAToFalse(id){
    return this._http.get(this.baseURL + '/getAll/UpdateFalse/' +id);
  }
}

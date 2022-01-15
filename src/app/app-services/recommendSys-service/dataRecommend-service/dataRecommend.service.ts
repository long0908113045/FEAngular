import { Injectable } from '@angular/core';
import { datasetRecommend } from './dataRecommend.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class DatasetRecommendService {
  datasetRecommend: datasetRecommend;
  datasetRecommends: datasetRecommend[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/dataset_recommend';
 
  putOrPostDatasetRecommend(datasetRecommend: datasetRecommend) {

    return this._http.post(this.baseURL,datasetRecommend)
  }
  
}

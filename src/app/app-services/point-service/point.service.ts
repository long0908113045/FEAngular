import { Injectable } from '@angular/core';
import { Point } from './point.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
    providedIn: 'root'
})
export class PointService {
    point: Point
    points: Point[];

    constructor(private _http: HttpClient, private _host: HostService) { }
    readonly baseURL = this._host.host() + '/points';
    getPointList() {
        return this._http.get(this.baseURL);
    }

    getPointById(_id: String) {
        return this._http.get(this.baseURL + "/" + _id);
    }
    postPoint(point: Point) {
        return this._http.post(this.baseURL, point);
    }
    deletePoint(_id: string) {
        return this._http.delete(this.baseURL + `/${_id}`);
    }
    getPointByUserID(_id: string) {
        return this._http.get(this.baseURL + "/getPointByUserID" + `/${_id}`);
    }
    //update
    putPointByUserID(point: Point) {
        return this._http.post(this.baseURL + "/updatePointByUserID", point);
    }
}

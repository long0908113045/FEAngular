import { Injectable } from '@angular/core';
import { SendMail } from './sendMail.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  selectedsendMail: SendMail;
  sendMail: SendMail[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/send';

  postsendMail(sendMail: SendMail) {
    return this._http.post(this.baseURL, sendMail);
  }

  postsendMailPayPal(sendMail: SendMail) {
    return this._http.post(this.baseURL+'/PayPal', sendMail);
  }
}

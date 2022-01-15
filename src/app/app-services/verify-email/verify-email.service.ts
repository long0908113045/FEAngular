import { Injectable } from '@angular/core';
import { VerifyEmail } from './verify-email.model';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {
  verifyEmail: VerifyEmail
  readonly apiVerifyMail = this._host.host();
  headers = new HttpHeaders().append('Content-Type', 'application/json');
  constructor(private router: Router, private httpClient: HttpClient,private _host:HostService) { }
  actionVerifyEmail(email: string) {
    return this.httpClient.get(this.apiVerifyMail + `/checkEmail/${email}`,{headers: this.headers});
  }
}

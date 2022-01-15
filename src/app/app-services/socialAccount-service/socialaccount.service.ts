import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';
import { SocialAccount } from './socialaccount.model';

@Injectable({
  providedIn: 'root'
})
export class SocialaccountService {
  socialAccounts: SocialAccount[];
  socialAccount: SocialAccount;


  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/socials';
  loginFacebook(facebook_id: String) {
    return this._http.post(this.baseURL + "/facebook",{
      facebook_id: facebook_id
    });
  }
  loginGoogle(google_id: String) {
    return this._http.post(this.baseURL + "/google",{
      google_id: google_id
    });
  }
  signUp(socialAccount: SocialAccount){
    return this._http.post(this.baseURL + "/addAccount",socialAccount);
  }
  getAllAccountSocial(){
    return this._http.get(this.baseURL);
  }
  getUserByID(id_user:String){
    return this._http.get(this.baseURL + `/${id_user}`);
  }
  getSocialAccountByGoogleID(googleID: String){
    return this._http.get(this.baseURL + "/findByGoogleId" + `/${googleID}`);
  }
  getSocialAccountByfacebookID(facebookID: String){
    return this._http.get(this.baseURL + "/findByFacebookId" + `/${facebookID}`);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';
import {AuthInfo} from './auth-info.model'
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';
import { SocialAccount } from '../socialAccount-service/socialaccount.model';
import { SocialaccountService } from '../socialAccount-service/socialaccount.service';
import { SocialUser } from 'ng4-social-login';
declare var $:any
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
   private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  private authInfoSubject = new BehaviorSubject<AuthInfo>({
    isLoggedIn: this.isAuthenticated(),
    role: this.getRole(),
    account: this.getAccount()
  });
  
  public authInfo = this.authInfoSubject.pipe(distinctUntilChanged());
  public isLoggedIn = this.loggedIn.asObservable().pipe(distinctUntilChanged());
  helper = new JwtHelperService();
  constructor(private router: Router,private http: HttpClient,private _host:HostService,private socialAccountService: SocialaccountService) {

  }
  readonly baseURL = this._host.host();
  login(credentials): Observable<any> {
    return this.http.post(this.baseURL+'/users/login', credentials)
      .pipe(map(
        data => {
          if(data['message'] != null){
           data = { message: data['message'] }
          }else{
            this.finishAuthentication(data);
          }
          return data;
        }
      ));
  }
  loginGoogle(google_id: String, user: any) :Observable<any>{
    return this.http.post(this.baseURL + "/socials/google",{
      google_id: google_id
    }).pipe(map(
      data => {
        console.log(data['status'])
      if(!data['status']){
          data = data['status']
        }
       else{
         this.finishAuthentication(data);
       }
       return data;
     }
    ));
  }
  signUp(socialAccount: SocialAccount) :Observable<any>{
    return this.http.post(this.baseURL + "/socials/addAccount",socialAccount).pipe(map(
      data => {
        console.log(data)
      if(data['message'] != null){
        data = data['message']
       }else{
         this.finishAuthentication(data);
       }
       return data
      }));
  }
  loginFacebook(facebook_id: String, user: any): Observable<any>{
    return this.http.post(this.baseURL + "/socials/facebook",{
      facebook_id: facebook_id
    }).pipe(map(
      data => {
        console.log(data['status'])
      if(!data['status']){
          data = data['status']
        }
       else{
         this.finishAuthentication(data);
       }
       return data;
     }
    ));
  }
  finishAuthentication(data): void {
    const token = this.helper.decodeToken(data.token);
    const expiresAt = JSON.stringify((token.exp * 1000));
    // save data to local storage
    localStorage.setItem('accountSocial', JSON.stringify(data.obj));
    localStorage.setItem('token', data.token);
    localStorage.setItem('expires-at', expiresAt);
    localStorage.setItem('role', token.role);
    this.loggedIn.next(true);
    // set current data to observable
    this.authInfoSubject.next({
      isLoggedIn: true,
      role: this.getRole(),
      account: this.getAccount()
    });
    if(this.isCustomer()){
      this.router.navigate(['homePage']);
    }else if(this.isAdmin()){
      this.router.navigate(['managePage']);
    }
  }

  logout(): Observable<any> {
    localStorage.clear();
    this.authInfoSubject.next({
      isLoggedIn: false,
      role: this.getRole(),
      account: this.getAccount()
    });

    return this.isLoggedIn;
  }
  formatCurrency(number){
		var n = number.split('').reverse().join("");
		var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");    
		return  n2.split('').reverse().join('') + 'VNĐ';
	}
  isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires-at'));
    return Date.now() < expiresAt;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
  getRole(): string {
    const role = localStorage.getItem('role');
    return role;
  }
  getAccount(): string {
    return localStorage.getItem('accountSocial')
  }
 
  isAdmin() {
    const role = localStorage.getItem('role');
    if (role) {
      return role.includes('ADMIN');
    }
    return false;
  }

  isCustomer() {
    const role = localStorage.getItem('role');
    if (role) {
      return role.includes('CUSTOMER');
    }
    return false;
  }
}

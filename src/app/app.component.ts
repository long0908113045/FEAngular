import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  constructor(private _router: Router) { }
  // accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  // statusLogin = localStorage.getItem('statusLogin');
  // loginBy = localStorage.getItem('loginBy');
  // ngOnInit() {
  //   if(this.accountSocial != null){
  //     if(this.accountSocial.role == "ADMIN"){
  //       this._router.navigate(['/dashboard']);
  //       }
  //       else if(this.accountSocial.role == "CUSTOMER"){
  //         this._router.navigate(['/homePage']);
  //       }
  //   }else{
  //     this._router.navigate(['/homePage']);
  //   }
  // }

}

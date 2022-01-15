import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {

  constructor(private _router: Router, private location: Location) { }
  loginBy: String = ""
  ngOnInit() {
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');
    this.loginBy = localStorage.getItem('loginBy');

  }
  moveToProfileDetail(){
    this._router.navigate(['/accountProfile'])
  }
  moveToProfileAccountSocial(){
    this._router.navigate(['/accountProfileSocial'])
  }
  cancel(){
    this.location.back();
  }
  goToOrderHistory(){
    this._router.navigate(['/orderHistory'])
  }
  goToDiscountCode(){
    this._router.navigate(['/discountCode'])
  }
  goToFavorite(){
    this._router.navigate(['/favorites'])
  }
}

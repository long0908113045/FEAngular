import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/app-services/auth-service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
	isLoggedIn = false
	role: string = ''
	isCustomer = false
  accountSocial: any
  constructor(private _router: Router, private authService: AuthenticateService) { }
  // accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  // statusLogin = localStorage.getItem('statusLogin');
  // loginBy = localStorage.getItem('loginBy');
  ngOnInit() {
	    this.authService.authInfo.subscribe(val => {
			this.isLoggedIn = val.isLoggedIn;
			this.role = val.role;
			this.isCustomer = this.authService.isCustomer()
			this.accountSocial = JSON.parse(this.authService.getAccount())
		  });
  }

  logout() {
      this.authService.logout();    
      this._router.navigate(['homePage']);
  }
  moveToAdminProfile(){
    this._router.navigate(['/adminProfile']);
  }
}

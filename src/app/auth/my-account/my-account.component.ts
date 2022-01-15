import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app-services/user-service/user.service';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
  AuthService
} from 'ng4-social-login';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Response } from '../../app-services/response/response.model';
import { User } from '../../app-services/user-service/user.model';
import { SocialaccountService } from '../../app-services/socialAccount-service/socialaccount.service';
import { SocialAccount } from 'src/app/app-services/socialAccount-service/socialaccount.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MustMatch } from '../helpers/must-match.validator';
import {AuthenticateService} from '../../app-services/auth-service/authenticate.service'


declare var $: any;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public user: any = SocialUser;
  errStringLogin: String = ""
  errRegister: String = ""
  statusRegister: Boolean = false
  showErrorMessage: Boolean = false;
  errorStr: String = ""
  statusLogin: Boolean = false
  alertMessage: string = ''

  registerForm: FormGroup;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });
  constructor(private _router: Router, private _userService: UserService,
    private spinnerService: Ng4LoadingSpinnerService,private authService: AuthenticateService,
    private socialAuthService: AuthService, private socialAccountService: SocialaccountService,private formBuilder: FormBuilder) {
    $(function () {
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });
    });

  }

  socialUser: SocialUser;
  CartBook = [];
	TongTien = 0;
  TongCount = 0;
  lengthCartBook = 0;
  templogin = 0;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', Validators.required],
      password: ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$%^&+=])(?=\\S+\$).{8,40}\$'),Validators.required]],
      cpass: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'cpass')
  });
    $(function () {
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });
    });
    this.initialAccount();
    this.getTotalCountAndPrice();
  }
  submitted_register = false;
  submitted_login = false;
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    get fLogin() { return this.loginForm.controls; }
  // set độ dài của giỏ hàng
  cartBookLength(CartBook) {
    if (CartBook == null) {
      this.lengthCartBook = 0;
    } else {
      this.lengthCartBook = CartBook.length;
    }
  }
  //get total count and price
  getTotalCountAndPrice() {
    this.TongTien = 0;
    this.TongCount = 0;
    this.CartBook = JSON.parse(localStorage.getItem("CartBook"));
    this.cartBookLength(this.CartBook);
    if (this.CartBook != null) {
      for (var i = 0; i < this.lengthCartBook; i++) {
        this.TongTien += parseInt((parseInt(this.CartBook[i].priceBook) * parseInt(this.CartBook[i].count)*(100-this.CartBook[i].sale)/100).toFixed(0));
        this.TongCount += parseInt(this.CartBook[i].count);
      }
    }
    $('#tongtien').html("&nbsp;" + this.formatCurrency(this.TongTien.toString()));
    $('.cart_items').html(this.TongCount.toString());
    localStorage.setItem("TongTien", this.TongTien.toString());
    localStorage.setItem("TongCount", this.TongCount.toString());
  }
  //#endregion
   formatCurrency(number){
    var n = number.split('').reverse().join("");
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");
    return  n2.split('').reverse().join('') + 'VNĐ';
}
  initialAccount() {
    this.socialAccountService.socialAccount = ({
      _id: null,
      email: '',
      username: '',
      imageUrl: '',
      facebook_id: '',
      google_id: '',
      role: ""
    });
  }
  register() {
    this.submitted_register = true;
    if (!this.registerForm.valid) {
      return;
    }
        this.registerForm.value.role = "CUSTOMER";
        this.spinnerService.show();
        setTimeout(()=>this.spinnerService.hide(),3300)
        this._userService.register(JSON.stringify(this.registerForm.value))
          .subscribe(
            data => {
              console.log(data)
              this.errRegister = ""
              localStorage.setItem("token", data["token"]);
              if(data["message"] == "Email has been sent--Please confirm"){
                this.statusRegister = true;
                  setTimeout(() => {  this.statusRegister = false; }, 3000);
                  this.registerForm.reset();
              }else if(!Object.bind(data).status){
                this.spinnerService.hide()
                this.errRegister = "Tài khoản email đã tồn tại!"
              }
            });
  }

  login() {
    this.submitted_login = true
    if (!this.loginForm.valid) {
      return;
    }
      this.showErrorMessage = false;
      //goij method login từ userService
      this.authService.login(JSON.stringify(this.loginForm.value)).subscribe((res) => {
        //gọi object response
        // const response: Response = res as Response;
        if (res['message'] != null) {
          this.errStringLogin = res['message']
        }
          localStorage.setItem("loginBy","loginbt")
      })
  }

  //Login with google
  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user.id);
      //Call method loginGoogle from SocialAccountService
      this.authService.loginGoogle(this.user.id, this.user).subscribe((res) => {
        if(!res){
          this.socialAccountService.socialAccount.google_id =  this.user.id;
          this.socialAccountService.socialAccount.username =  this.user.name;
          this.socialAccountService.socialAccount.email =  this.user.email;
          this.socialAccountService.socialAccount.imageUrl =  this.user.photoUrl;
          this.authService.signUp(this.socialAccountService.socialAccount).subscribe(signUp =>{
            // console.log(signUp)
          })
        }
        localStorage.setItem("loginBy","loginSocial")
      });
    });
  }
  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user);
      this.authService.loginFacebook(this.user.id, this.user).subscribe((res) => {
        if(!res){
          this.socialAccountService.socialAccount.facebook_id =  this.user.id;
          this.socialAccountService.socialAccount.username =  this.user.name;
          this.socialAccountService.socialAccount.email =  this.user.email;
          this.socialAccountService.socialAccount.imageUrl =  this.user.photoUrl;
          this.authService.signUp(this.socialAccountService.socialAccount).subscribe(signUp =>{
            console.log(signUp)
          })
        }
        localStorage.setItem("loginBy","loginSocial")
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../app-services/user-service/user.service';
import { User } from '../../../app-services/user-service/user.model';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Response } from '../../../app-services/response/response.model';
declare var $:any;
@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css']
})
export class ProfileChangePasswordComponent implements OnInit {

  changPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    currentPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
    rePassword: new FormControl(null, Validators.required)
    })

  constructor(private _router: Router, private route: ActivatedRoute,private userService: UserService, private location: Location) { }
  loginBy: String = ""
  statusLogin = localStorage.getItem('statusLogin');
  ngOnInit() {
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');
    let id = this.route.snapshot.paramMap.get('id');
    if (this.statusLogin != null) { this._router.navigate(['/account']); }
    this.loginBy = localStorage.getItem('loginBy');
    this.getUserById(id);
  }
  getUserById(id){
    this.userService.getUserById(id).subscribe(res => {
      console.log(res)
      this.userService.selectedUser = res as User;
    })
  }

  initialAccount() {
    this.userService.selectedUser = ({
      _id: null,
      email: '',
      username: '',
      password: '',
      imageUrl: '',
      role: '',
      status: null
    });
  }

  alertMessage: string = ""
  alertSucess: boolean = false
  statusChangePass: boolean = false
  changePassword() {
    let id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id).subscribe(res => {
      console.log(res)
      this.userService.selectedUser = res as User;
      if (!this.changPasswordForm.controls.currentPassword.valid || !this.changPasswordForm.controls.newPassword.valid || !this.changPasswordForm.controls.rePassword.valid) {
        alert("Mời nhập đầy đủ thông tin")
        return;
      }
        if (this.changPasswordForm.controls.newPassword.value != this.changPasswordForm.controls.rePassword.value) {
          alert("Xác nhận mật khẩu không đúng!");
          return;
        }
        else {
          console.log(JSON.stringify(this.changPasswordForm.value));
          this.changPasswordForm.value.email = this.userService.selectedUser.email;
          this.userService.changePassword(this.changPasswordForm.value)
            .subscribe(
              data => {
                console.log(data);
                const response: Response = data as Response;
                this.statusChangePass = true;
                this.alertMessage = response.message;
                if(this.alertMessage == "Password was wrong!") {
                  setTimeout(() => {  this.statusChangePass = false;
                    this.alertMessage = ""; }, 3000);
              } else {
                setTimeout(() => {  this.statusChangePass = false;
                  this.alertMessage = ""; }, 3000);
                    this.changPasswordForm.controls.newPassword.reset();
                    this.changPasswordForm.controls.currentPassword.reset();
                    this.changPasswordForm.controls.rePassword.reset();
                }

              },
              error => {
                console.log(error);
              })
        }
    })
  }

    cancel(){
      this.location.back();
    }
    moveToProfileDetail(){
      this._router.navigate(['/accountProfile'])
    }
    moveToProfileAccountSocial(){
      this._router.navigate(['/accountProfileSocial'])
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

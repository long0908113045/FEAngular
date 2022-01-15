import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { User } from 'src/app/app-services/user-service/user.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Response } from 'src/app/app-services/response/response.model';
@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {
  changPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.required]),
    currentPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
    rePassword: new FormControl(null, Validators.required)
    })

  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  constructor(private _router: Router, private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    let id = JSON.parse(localStorage.getItem("accountSocial"))._id;
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
                if( response.message ==  "Password was wrong!"){
                  this.statusChangePass = false;
                  this.alertMessage = response.message;
                }else{
                  this.statusChangePass = true;
                  this.alertMessage = response.message;
                }
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
    moveToAdminProfile(){
      this._router.navigate(['/adminProfile']);
    }
    logout(){
      localStorage.clear();
      document.location.href = "/homePage";
    }
}

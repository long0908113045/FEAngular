import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/app-services/user-service/user.model';
import { Location } from '@angular/common';
import { Response } from 'src/app/app-services/response/response.model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css']
})
export class InsertUserComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required),
    repassword: new FormControl(null, Validators.required),
    role: new FormControl(null)
  })
  constructor(private _router: Router, private userService: UserService, private location: Location) { }
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));

  ngOnInit() {
  }
 
  alertMessage: string = ""
  alertSucess: boolean = false
  errString: string = ''
  register() {
    if (this.registerForm.value.email == null || this.registerForm.value.password == null ||
       this.registerForm.value.repassword == null ||  this.registerForm.value.username == null || this.registerForm.value.role == null) {
      alert("Mời nhập đầy đủ thông tin");
      return;
    }
    else
      if (this.registerForm.controls.password.value != this.registerForm.controls.repassword.value) {
        alert("Xác nhận mật khẩu không đúng!");
        return false;
      }
      else {
        this.userService.register(JSON.stringify(this.registerForm.value))
          .subscribe(data => {
            const response: Response = data as Response;
            if (response.status == false) {
              console.log(response.message)
              this.errString = "Email đã tồn tại! Vui lòng chọn email khác!";
              return;
            }
            else {
              Swal.fire({
                text: "Thêm người dùng thành công",
                icon: 'success',
                showCancelButton: true,  
                confirmButtonText: 'Ok',  
      
              })
              this._router.navigate(['/manageUser']);
              }
            });
          }
      }
      cancel(){
        this._router.navigate(['/manageUser']);
      }
      getUsername="";
      getUserName(event : any)
      { 
        this.getUsername=event.target.value;
  
      }
       
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}


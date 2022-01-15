import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { User } from 'src/app/app-services/user-service/user.model';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import  Swal  from 'sweetalert2'
@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.css']
})
export class AdminProfileEditComponent implements OnInit {
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  constructor(private _router: Router, private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getUserById(id);
    }
  getUserById(id){
    this.userService.getUserById(id).subscribe(res => {
      console.log(res)
      this.userService.selectedUser = res as User;
    })
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: null,
      email: "",
      username: "",
      role: null,
      password: null,
      imageUrl: null,
      status: null
    }
  }
  alertMessage: string = ""
  alertSucess: boolean = false
  onSubmit(form: NgForm) {
    let id = this.route.snapshot.paramMap.get('id');
    Swal.fire({
      title: "Bạn có chắc muốn cập nhật thông tin không?",
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      cancelButtonText: 'Cancel' 
    })
      .then((willDelete) => {
        if (willDelete) {
          this.userService.getUserById(id).subscribe(res => {
            this.userService.selectedUser = res as User;
            this.userService.selectedUser.email = form.value.email;
            this.userService.selectedUser.username = form.value.username;
            this.userService.selectedUser.role = "ADMIN";
            this.userService.selectedUser.imageUrl = form.value.imageUrl;
            this.userService.updateUser(this.userService.selectedUser).subscribe(
              data => {
                console.log(data);
                this.userService.selectedUser = data as User;
                this.alertSucess = true;
                // this.alertMessage = "Update Profile Successfully!";
                setTimeout(() => {  this.location.back(); }, 1000);
                localStorage.removeItem("accountSocial");
               localStorage.setItem("accountSocial", JSON.stringify(data)); 
             },
              error => console.log(error)
             );
          })
          Swal.fire({
            title: "Đã cập nhật thành công!",
            text: "Thông tin đã được cập nhật.",
            icon: 'success'
          });
        }
      });
    }
    moveToAdminProfile(){
      this._router.navigate(['/adminProfile']);
    }
    logout(){
      localStorage.clear();
      document.location.href = "/homePage";
    }
}

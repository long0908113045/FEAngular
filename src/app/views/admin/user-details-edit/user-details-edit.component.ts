import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { User } from 'src/app/app-services/user-service/user.model';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  constructor(private _router: Router, private userService: UserService,
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getUserById(id);
  }
  getUserById(id) {
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
      text: "Bạn có chắc muốn cập nhật thông tin user này không?",
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
            this.userService.selectedUser.role = form.value.role;
            this.userService.selectedUser.imageUrl = form.value.imageUrl;
            this.userService.updateUser(this.userService.selectedUser).subscribe(
              data => {
                console.log(data);
                this.userService.selectedUser = data as User;
                setTimeout(() => { this.location.back(); }, 1000);
              },
              error => console.log(error)
            );
            Swal.fire({
              title: "Đã cập nhật thành công!",
              text: "User này đã được cập nhật thông tin.",
              icon: 'success'
            });

          });
        }
      });

  }

  cancel() {
    this.location.back();
  }
  logout() {
    localStorage.clear();
    document.location.href = "/homePage";
  }
}

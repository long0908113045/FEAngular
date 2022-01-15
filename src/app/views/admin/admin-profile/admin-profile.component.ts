import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { User } from 'src/app/app-services/user-service/user.model';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(private _router: Router, private userService: UserService) { }
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
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
  moveToAdminProfileEdit(userId)
  {
    return this._router.navigate(["/adminProfileEdit" + `/${userId}`]);
  }
  moveToAdminChangePassword(userId)
  {
    return this._router.navigate(["/adminChangePassword" + `/${userId}`]);
  }
  logout(){
    localStorage.clear();
    document.location.href = "/homePage";
  }
}

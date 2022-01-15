import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { User } from 'src/app/app-services/user-service/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));

  constructor(private _router: Router, private userService: UserService, private route: ActivatedRoute) { }
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
  moveToUserProfileEdit(userId)
  {
    return this._router.navigate(["/userDetailEdit" + `/${userId}`]);
  }
  cancel(){
    this._router.navigate(['/manageUser']);
  }
  logout(){
    localStorage.clear();
    document.location.href = "/homePage";
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/app-services/user-service/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'; 


@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.css']
})
export class AdminManageUserComponent implements OnInit {
  statusCRUD: String = ""
  displayedColumns: string[] = ['imageUrl', 'empty1', 'email', 'username', 'empty2', 'Details', 'Edit', 'Delete'];
  // dataSource: MatTableDataSource<Book>;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _router: Router, private userService: UserService) {

  }
  accountSocial = JSON.parse(localStorage.getItem("accountSocial"));
  ngOnInit() {
    this.refreshUserList();
  }

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserById(userId) {
    return this._router.navigate(["/userDetail" + `/${userId}`]);
  }
  updateUserById(userId) {
    return this._router.navigate(["/userDetailEdit" + `/${userId}`]);
  }

  users: any
  refreshUserList() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
      this.dataSource.data = this.users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  alertId(data) {
    console.log(data);
  }
  alertSuccess: boolean = false;
  alertMessage: string = "";
  deleteUserById(_id: string) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa người dùng này không?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      cancelButtonText: 'Cancel'  
    })
      .then((willDelete) => {
        if (willDelete) {
          this.userService.deleteUser(_id).subscribe(
            data => {
              this.ngOnInit();
            },
            error => console.log(error)
          )
          Swal.fire({
            title: "Đã xóa xong!",
            text: "Người dùng này đã được xóa.",
            icon: 'success'
          });
        }
      });
  }
  insertUser() {
    this._router.navigate(['/insertUser']);
  }
   
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/app-services/user-service/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import { PromotionService } from 'src/app/app-services/promotion-service/promotion.service';
@Component({
  selector: 'app-admin-manage-event',
  templateUrl: './admin-manage-event.component.html',
  styleUrls: ['./admin-manage-event.component.css']
})
export class AdminManageEventComponent implements OnInit {
  statusCRUD: String = ""
  displayedColumns: string[] = ['status','empty0','imgPromotion','empty1','headerPromotion','empty2','discount','empty3', 'ifDiscount','empty4','startDate','empty5', 'endDate','empty6', 'isShow','empty7', 'Details', 'Edit', 'Delete'];
  // dataSource: MatTableDataSource<Book>;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _router: Router, private promotionService: PromotionService) {

  }
  accountSocial = JSON.parse(localStorage.getItem("accountSocial"));
  ngOnInit() {
    this.refreshBooksList();

    // this.getNameCategory();
  } 

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCategoryById(eventID) {
    return this._router.navigate(["/eventDetails" + `/${eventID}`]);
  }
  updateCategoryById(eventID) {
    return this._router.navigate(["/updateEvent" + `/${eventID}`]);
  }

  promotions: any
  listPromotion = [];
  refreshBooksList() {
    this.promotionService.getManagerPromotion().subscribe((res) => {
      this.promotions = res;
      this.dataSource.data = this.promotions;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  alertId(data) {
    console.log(data);
  }
  alertSuccess: boolean = false;
  alertMessage: string = "";
  deleteCategoryById(_id: string) {
    Swal.fire({
      text: "Bạn có chắc muốn xóa sự kiện này không?",
      icon: 'warning',
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      cancelButtonText: 'Cancel'
    })
      .then((willDelete) => {
        if (willDelete) {
          this.promotionService.deletePromotion(_id).subscribe(
            data => {
              
              this.ngOnInit();
              this.alertSuccess = true;
              this.alertMessage = "Xóa Thông Tin Thể Loại Thành Công!";
              setTimeout(() => {
              this.alertSuccess = false;
                this.alertMessage = "";
              }, 2000);
            },
            error => console.log(error)
          )
          Swal.fire({
            title: "Đã xóa xong!",
            text: "Sự kiện này đã được xóa.",
            icon: 'success'
          });
        }
      });
  }

  addEvent() {
    this._router.navigate(['/insertEvent']);
  }
   
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

  ClickUsePromotion(id){
    this.promotionService.UpdateIsShow(id).subscribe(update=>{
        this.ngOnInit()
    })
  }

}

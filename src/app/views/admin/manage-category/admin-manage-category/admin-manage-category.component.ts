
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/app-services/user-service/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/app-services/user-service/user.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Book } from 'src/app/app-services/book-service/book.model';
import { BookService } from 'src/app/app-services/book-service/book.service';
import { CategoryService } from 'src/app/app-services/category-service/category.service';
import { Category } from 'src/app/app-services/category-service/category.model';
import { AuthorService } from 'src/app/app-services/author-service/author.service';
import { Author } from 'src/app/app-services/author-service/author.model';
import { SeriService } from 'src/app/app-services/seri-service/seri.service';
import { Seri } from 'src/app/app-services/seri-service/seri.model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-admin-manage-category',
  templateUrl: './admin-manage-category.component.html',
  styleUrls: ['./admin-manage-category.component.css']
})
export class AdminManageCategoryComponent implements OnInit {
  statusCRUD: String = ""
  displayedColumns: string[] = ['imgCategory', 'empty1','nameCategory', 'empty2', 'Details', 'Edit', 'Delete'];
  // dataSource: MatTableDataSource<Book>;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _router: Router, private bookService: BookService, private authorService: AuthorService,
    private seriService: SeriService, private userService: UserService, private categoryService: CategoryService) {

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

  getCategoryById(categoryId) {
    return this._router.navigate(["/categoryDetails" + `/${categoryId}`]);
  }
  updateCategoryById(categoryId) {
    return this._router.navigate(["/updateCategory" + `/${categoryId}`]);
  }

  categories: any
  listCategory = [];
  refreshBooksList() {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categories = res;
      console.log(this.categories)
      this.dataSource.data = this.categories;
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
      text: "Bạn có chắc muốn xóa thể loại này không?",
      icon: 'warning',
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      cancelButtonText: 'Cancel'
    })
      .then((willDelete) => {
        if (willDelete) {
          this.categoryService.deleteCategory(_id).subscribe(
            data => {
              
              this.ngOnInit();
              setTimeout(() => {
              this.alertSuccess = false;
                this.alertMessage = "";
              }, 2000);
            },
            error => console.log(error)
          )
          Swal.fire({
            title: "Đã xóa xong!",
            text: "Thể loại này đã được xóa.",
            icon: 'success'
          });
        }
      });
  
  }

  addCategory() {
    this._router.navigate(['/insertCategory']);
  }
   
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

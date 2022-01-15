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

@Component({
  selector: 'app-admin-manage-seri',
  templateUrl: './admin-manage-seri.component.html',
  styleUrls: ['./admin-manage-seri.component.css']
})
export class AdminManageSeriComponent implements OnInit {
  statusCRUD: String = ""
  displayedColumns: string[] = ['seriName', 'empty2', 'Details', 'Edit', 'Delete'];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSeriById(seriId) {
    return this._router.navigate(["/seriDetails" + `/${seriId}`]);
  }
  updateSeriById(seriId) {
    return this._router.navigate(["/updateSeri" + `/${seriId}`]);
  }

  seris: any
  listSeri = [];
  refreshBooksList() {
    this.seriService.getSeriList().subscribe((res) => {
      this.seris = res;
      console.log(this.seris)
      this.dataSource.data = this.seris;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  alertId(data) {
    console.log(data);
  }
  alertSuccess: boolean = false;
  alertMessage: string = "";
  deleteSeriById(_id: string) {
    if (confirm('Bạn có muốn xóa seri này không ?') == true) {
      this.seriService.deleteSeri(_id).subscribe(
        data => {
          this.ngOnInit();
          this.alertSuccess = true;
          this.alertMessage = "Xóa Thông Tin seri Thành Công!";
          setTimeout(() => {
          this.alertSuccess = false;
            this.alertMessage = "";
          }, 2000);
        },
        error => console.log(error)
      )
    }
  }

  addSeri() {
    this._router.navigate(['/insertSeri']);
  }
   
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

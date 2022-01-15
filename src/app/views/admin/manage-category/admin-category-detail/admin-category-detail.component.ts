import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/app-services/book-service/book.service';
import { Book } from 'src/app/app-services/book-service/book.model';
import { CategoryService } from 'src/app/app-services/category-service/category.service';
import { Category } from 'src/app/app-services/category-service/category.model';
import { AuthorService } from 'src/app/app-services/author-service/author.service';
import { SeriService } from 'src/app/app-services/seri-service/seri.service';
import { Author } from 'src/app/app-services/author-service/author.model';
import { Seri } from 'src/app/app-services/seri-service/seri.model';

@Component({
  selector: 'app-admin-category-detail',
  templateUrl: './admin-category-detail.component.html',
  styleUrls: ['./admin-category-detail.component.css']
})
export class AdminCategoryDetailComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute,private categoryService: CategoryService,
     private bookService: BookService, private authorService: AuthorService, private seriService: SeriService) { }
     accountSocial = JSON.parse(localStorage.getItem("accountSocial"));

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getCategoryById(id);
  }
  category:any
  getCategoryById(id:string) {
      this.categoryService.getCategoryById(id).subscribe(category => {
        this.category = category as Category;
    });
  }

    updateCategoryById(categoryId) {
      return this._router.navigate(["/updateCategory" + `/${categoryId}`]);
    }
    cancel(){
      this._router.navigate(['/manageCategory'])
    }
     
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

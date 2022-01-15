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
  selector: 'app-admin-book-details',
  templateUrl: './admin-book-details.component.html',
  styleUrls: ['./admin-book-details.component.css']
})
export class AdminBookDetailsComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute,private categoryService: CategoryService,
     private bookService: BookService, private authorService: AuthorService, private seriService: SeriService) { }
     accountSocial = JSON.parse(localStorage.getItem("accountSocial"));

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getBookById(id);
  }
 getBookById(id:string) {
    this.bookService.getBookById(id).subscribe((res) => {
      this.bookService.selectedBook = res as Book;
      this.categoryService.getCategoryById(this.bookService.selectedBook.categoryID).subscribe(category => {
        this.categoryService.category = category as Category;
        this.authorService.getAuthorById(this.bookService.selectedBook.authorID).subscribe(author => {
          this.authorService.author = author as Author;
          this.seriService.getSeriById(this.bookService.selectedBook.seriID).subscribe(seri => {
            this.seriService.seri = seri as Seri;
          })
        })
      })
    });
  }
  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((res) => {
		  this.categoryService.categories = res as Category[];
		});
    }
    updateBookById(bookId) {
      return this._router.navigate(["/updateBook" + `/${bookId}`]);
    }
    cancel(){
      this._router.navigate(['/manageBook'])
    }
     
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

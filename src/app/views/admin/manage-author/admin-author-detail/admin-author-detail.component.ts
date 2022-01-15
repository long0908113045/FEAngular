
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
  selector: 'app-admin-author-detail',
  templateUrl: './admin-author-detail.component.html',
  styleUrls: ['./admin-author-detail.component.css']
})
export class AdminAuthorDetailComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute,private categoryService: CategoryService,
     private bookService: BookService, private authorService: AuthorService, private seriService: SeriService) { }
     accountSocial = JSON.parse(localStorage.getItem("accountSocial"));

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getAuhtorById(id);
  }
  author:any
  getAuhtorById(id:string) {
      this.authorService.getAuthorById(id).subscribe(author => {
        this.author = author as Author;
    });
  }

    updateAuthorById(authorID) {
      return this._router.navigate(["/updateAuthor" + `/${authorID}`]);
    }
    cancel(){
      this._router.navigate(['/manageAuthor'])
    }
     
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

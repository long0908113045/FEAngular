import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../../../app-services/book-service/book.service';
import { CategoryService } from '../../../../app-services/category-service/category.service';
import { AuthorService } from '../../../../app-services/author-service/author.service';
import { Category } from '../../../../app-services/category-service/category.model';
import { Author } from '../../../../app-services/author-service/author.model';
import { Seri} from '../../../../app-services/seri-service/seri.model';
import { SeriService } from '../../../../app-services/seri-service/seri.service';
import Swal from 'sweetalert2'
declare var $:any;
@Component({
  selector: 'app-insert-book',
  templateUrl: './insert-book.component.html',
  styleUrls: ['./insert-book.component.css']
})
export class InsertBookComponent implements OnInit {
  statusInsert:Boolean = false;
  accountSocial = JSON.parse(localStorage.getItem("accountSocial"));

  countryForm: FormGroup;
  // countries = ['USA', 'Canada', 'Uk']
  constructor(private _router:Router,  private bookService:BookService, 
    private fb: FormBuilder,private categoryService: CategoryService, 
    private authorService: AuthorService,private seriService : SeriService) {
    $(function() {
      $(document).ready(function() {
        $("#selectCategory").change(function() {
          var selectedVal = $("#selectCategory option:selected").val();
          alert(selectedVal);
        });
        $("#selectAuthor").change(function() {
          var selectedVal = $("#selectAuthor option:selected").val();
          alert(selectedVal);
        });
      });
    });
  }
  
  ngOnInit() {
    $(function () {
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });

    });
    this.resetForm();
    this.getCategoryList();
    this.getAuthorList();
    this.getSeriList();
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.bookService.selectedBook = {
      _id: null,
      nameBook:"",
      categoryID: "",
      authorID: "",
      priceBook: null,
      detailBook: "",
      tryRead: "",
      imgBook: "",
      seriID: "",
      sale: null,
      count: null,
      quantity:null,
      rate:null,
    };
  }
  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categoryService.categories = res as Category[];
    
		});
    }
    getAuthorList() {
      this.authorService.getAuthorList().subscribe((res) => {
        this.authorService.authors = res as Author[];
        
      });
    }
    getSeriList() {
      this.seriService.getSeriList().subscribe((res) => {
        this.seriService.series = res as Seri[];
       
      });
    }
    cancel(){
      this._router.navigate(['/manageBook']);
    }
    onSubmit(form: NgForm) {
      if(form.value.categoryID=="") form.value.categoryID= this.categoryService.categories[0]._id
          this.bookService.postBook(form.value).subscribe(
            data => {
              Swal.fire({
                text: "Thêm thông tin sách thành công",
                icon: 'success',
                showCancelButton: true,  
                confirmButtonText: 'Ok',  
     
              })  
              this._router.navigate(['/manageBook']);
        },
            error => console.log(error)
           );
    }
    getLinkImgBook="";
    getLinkImg(event : any)
    { 
      this.getLinkImgBook=event.target.value;

    }
     
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}


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
  selector: 'app-insert-author',
  templateUrl: './insert-author.component.html',
  styleUrls: ['./insert-author.component.css']
})
export class InsertAuthorComponent implements OnInit {
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

 
  }
  author:any
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.author = {
      _id: null,
      nameAuthor:"",
      imgAuthor:"",
      detailAuthor:"",
    };
  }
    cancel(){
      this._router.navigate(['/manageBook']);
    }
    onSubmit(form: NgForm) {
      console.log(form.value)
          this.authorService.postAuthor(form.value).subscribe(
            data => {
              Swal.fire({
                text: "Thêm tác giả thành công",
                icon: 'success',
                showCancelButton: true,  
                confirmButtonText: 'Ok',  
    
              })
              this._router.navigate(['/manageAuthor']);
        },
            error => console.log(error)
           );
    }

    getLinkImgAuthor="";
    getLinkImg(event : any)
    { 
      this.getLinkImgAuthor=event.target.value;

    }
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

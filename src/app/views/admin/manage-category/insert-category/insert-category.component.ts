

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../../../app-services/book-service/book.service';
import { CategoryService } from '../../../../app-services/category-service/category.service';
import { AuthorService } from '../../../../app-services/author-service/author.service';
import { SeriService } from '../../../../app-services/seri-service/seri.service';
import Swal from 'sweetalert2'
declare var $:any;
@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrls: ['./insert-category.component.css']
})
export class InsertCategoryComponent implements OnInit {
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
  category:any
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.category = {
      _id: null,
      nameCategory:"",
      imgCategory: "",
      detailCategory: "",
    };
  }
    cancel(){
      this._router.navigate(['/manageCategory']);
    }
    onSubmit(form: NgForm) {
          this.categoryService.postCategory(form.value).subscribe(
            data => {
              Swal.fire({
                text: "Thêm thông tin thể loại thành công",
                icon: 'success',
                showCancelButton: true,  
                confirmButtonText: 'Ok',  
                cancelButtonText: 'Cancel'
              }) 
             this._router.navigate(['/manageCategory']);
        },
            error => console.log(error)
           );
    }
    getLinkImgCategory="";
    getLinkImg(event : any)
    { 
      this.getLinkImgCategory=event.target.value;

    }
     
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

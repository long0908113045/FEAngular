

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../app-services/book-service/book.service';
import { NgForm } from '@angular/forms';
import { Book } from '../../../../app-services/book-service/book.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../../app-services/category-service/category.service';
import { Category } from '../../../../app-services/category-service/category.model';
import { AuthorService } from '../../../../app-services/author-service/author.service';
import { Author } from '../../../../app-services/author-service/author.model';
import { SeriService } from 'src/app/app-services/seri-service/seri.service';
import { Seri } from 'src/app/app-services/seri-service/seri.model';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
declare var $:any;
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  id_book: string;
  alertSucess: boolean = false;
  selectedValue = '';
  countryForm: FormGroup;
  categories = [];
  event : any;
  accountSocial = JSON.parse(localStorage.getItem("accountSocial"));

  // countries = ['USA', 'Canada', 'Uk']
  constructor(private _router:Router,  private bookService:BookService, private seriService: SeriService,private location: Location,
    private fb: FormBuilder,private categoryService: CategoryService, 
    private authorService: AuthorService, private route: ActivatedRoute) {
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

     }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
   this.getCategoryByID(id);
    this.resetForm();
  }
  category:any
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.category = {
      _id: "",
      nameCategory:"",
      imgCategory: "",
      detailCategory: "",
    }
  }
  getCategoryByID(id:string) {
    this.categoryService.getCategoryById(id).subscribe((res) => {
      this.category = res as Category;
    });
  }
    cancel(){
      this.location.back();
        }
    alertMessage: string = ""
    onSubmit(form: NgForm) {
      Swal.fire({
        text: "Bạn có chắc muốn cập nhật thông tin thể loại này không ?",
        icon: 'warning',
        showCancelButton: true,  
        confirmButtonText: 'Ok',  
        cancelButtonText: 'Cancel'
      })
        .then((willDelete) => {
          if (willDelete) {
            let id = this.route.snapshot.paramMap.get('id');
            form.value._id = id;
            form.value.quantity=100;
            this.categoryService.putCategory(form.value).subscribe(
             data => {
              setTimeout(() => {  this.alertSucess = false;
                this.alertMessage = "";this._router.navigate(['/manageCategory']); },2000);
            },
             error => console.log(error)
            );
            Swal.fire({
              title: "Đã cập nhật thành công!",
              text: "Thông tin thể loại sách đã được cập nhật.",
              icon: 'success'
            });
          }
        });
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

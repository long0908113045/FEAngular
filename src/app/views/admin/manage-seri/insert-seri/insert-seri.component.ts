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
declare var $:any;
@Component({
  selector: 'app-insert-seri',
  templateUrl: './insert-seri.component.html',
  styleUrls: ['./insert-seri.component.css']
})
export class InsertSeriComponent implements OnInit {
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
  seri:any
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.seri = {
      _id: null,
      seriName:"",
    };
  }
    cancel(){
      this._router.navigate(['/manageSeri']);
    }
    onSubmit(form: NgForm) {
      console.log(form.value)
          this.seriService.postSeri(form.value).subscribe(
            data => {console.log(data);this._router.navigate(['/manageSeri']);
          this.statusInsert = true;
        },
            error => console.log(error)
           );
    }

     
  logout() {
    localStorage.clear();
    window.location.href = "/homePage";
  }

}

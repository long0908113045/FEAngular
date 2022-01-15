import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BookService } from '../../../app-services/book-service/book.service';
import { Book } from '../../../app-services/book-service/book.model';
import { CategoryService } from '../../../app-services/category-service/category.service';
import { Category } from '../../../app-services/category-service/category.model';
import { Session } from 'protractor';
import { AuthorService } from '../../../app-services/author-service/author.service';
import { Author } from '../../../app-services/author-service/author.model';
import { FormGroup, FormControl } from '@angular/forms';
import { BookFiter } from '../../../app-services/book-service/bookfilter.model';
import { SocialAccount } from 'src/app/app-services/socialAccount-service/socialaccount.model';
import { CartBookService } from 'src/app/app-services/cartBook-service/cartBook.service';
import { CartBook } from 'src/app/app-services/cartBook-service/cartBook.model';
//favorite
import { Favorite } from 'src/app/app-services/favorite-service/favorite.model';
import { FavoriteService } from 'src/app/app-services/favorite-service/favorite.service';
declare var $: any
@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})

export class BookCategoryComponent implements OnInit {
  filterPriceForm: FormGroup = new FormGroup({
    price1: new FormControl(null),
    price2: new FormControl(null)
  });
  sortPriceForm: FormGroup = new FormGroup({
    sortByPrice: new FormControl(null)
  });
  searchForm: FormGroup = new FormGroup({
    nameBook: new FormControl(null)
  });
  searchText;
  searchCategory;
  pageOfItems: Array<any>;
  books: Array<Book> = new Array<Book>();
  items: any;
  collection = [];
  selectedCategory: String = "";
  bookFilter: BookFiter = new BookFiter();
  //alert
  alertMessage = "";
  alertSucess = false;
  alertFalse = false;
  cartBookDB: CartBook = new CartBook;
  constructor(private _router: Router,private route: ActivatedRoute, private bookService: BookService, private authorService: AuthorService,
    private bookCategoryService: CategoryService, private _cartBookDB: CartBookService,private _favoriteService:FavoriteService) {

    $(function () {

    });
    this.selectedCategory = localStorage.getItem('selectedCategory');
  }
  currentValues = [40000, 300000];
  price1: number
  price2: number
  onSliderChange(selectedValues: number[]) {
    this.currentValues = selectedValues;
    $(function () {
      $("#amount-min").val("Min : " + selectedValues[0] + "đ");
      $("#amount-max").val("Max : " + selectedValues[1] + "đ");
    });
    console.log(this.bookFilter.price1)
    this.price1 = selectedValues[0];
    this.price2 = selectedValues[1];
    
  }
filterByPrice(){
  this.bookFilter.price1 = this.price1
  this.bookFilter.price2 = this.price2
  this.filter();
}

  booksCategory: []
  category_id: string;
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  statusLogin: string = ""
  searchBy = this.route.snapshot.paramMap.get('id');
  favorite: Favorite = new Favorite
	listFavorite :any
  ngOnInit() {
    this.getAllFavoriteByUserId();
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');
    $(function () {
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });

    });
    this.refreshBookList();
    this.refreshCategoryList();
    this.category_id = localStorage.getItem('category_id');

    this.statusLogin = localStorage.getItem('statusLogin');

    //set độ dài cartBook
    this.cartBookLength(this.CartBook);
    //set value giỏ hàng trên thanh head 
    this.getTotalCountAndPrice();
    this.getAllAuthor();
    //this.initialBookFilter();
    this.bookFilter.nameBook=this.searchBy;
    this.filter();
  }
  initialBookFilter() {
    this.bookFilter = ({
      nameBook: '',
      category_id: '',
      author_id: '',
      price1: null,
      price2: null,
      sortByPrice: ''
    })
  }
  // check count cart before add (hover )
  checkCountMax10 = true;
  checkCountCartBeforeAdd(selectedBook: Book) {
    this.checkCountMax10 = true;
    for (var i = 0; i < this.lengthCartBook; i++) {
      if (this.CartBook[i]._id == selectedBook._id) {
        //kiểm tra số lượng 
        if (this.CartBook[i].count == 10) {
          this.checkCountMax10 = false;
        }
        console.log(this.CartBook[i].count);
      }
    }
    //nếu sách không có trong cartbook ( chưa từng thêm vào giỏ)

  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  selectedBook = [];
  detailBook(book: Book) {
    return this._router.navigate(['/bookDetail/' + `/${book._id}`]);

  }
  refreshCategoryList() {
    this.bookCategoryService.getCategoryList().subscribe((res) => {
      this.bookCategoryService.categories = res as Category[];
      this.startPageCategories = 0;
      this.paginationLimitCategories = 5;
    });
  }

  refreshBookList() {
    this.bookFilter.category_id = null;
    this.bookFilter.author_id = null;
    this.bookFilter.price1 = null;
    this.bookFilter.price2 = null;
    this.bookService.getBookList().subscribe((res) => {
      this.books = res as Book[];
     
    });
  }
  showCategory(id: String) {
    var category: any;
    this.bookCategoryService.getCategoryById(id).subscribe((res) => {
      this.bookCategoryService.categories = res as Category[];
      category = res;
    });
  }
  getid_book(id) {
    localStorage.setItem('book_detail', id);
  }

  gettypeCategory(category_id) {
    if (this.bookFilter.category_id == category_id) {
      this.bookFilter.category_id = null;
    } else {
      this.bookFilter.category_id = category_id;
    }
    this.filter();
  }


  getBookByAuthorId(author_id) {

    if (this.bookFilter.author_id == author_id) {
      this.bookFilter.author_id = null;
    } else {
      this.bookFilter.author_id = author_id;
    }
    this.filter();
  }


  filter() {
    this.bookService.filterBook(this.bookFilter).subscribe(res => {
      this.books = res as Book[]
    })
  }

  change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  }
  searchNameBook() {

    this.bookFilter.nameBook = this.searchForm.value.nameBook;
    this.filter();
  }
  onEditClick(event){
    this.bookFilter.sortByPrice = event;
    this.filter();
  }
  // sort() {
  //   let selected = $('select[name=orderby] option').filter(':selected').val()
  //   this.bookFilter.sortByPrice = selected;
  //   this.filter();
  // }

  getAllAuthor() {
    this.authorService.getAuthorList().subscribe((res) => {
      this.authorService.authors = res as Author[];
      this.startPage = 0;
      this.paginationLimit = 5;
 
    });
  }

  addABook = "";
  //add to cart (BookDetail,CountSelect)
  // số lượng tối đa chỉ được 10 mỗi quốn sách , tính luôn đã có trong giỏ

  checkedAddBook = true;
  addToCart(selectedBook: Book) {
    this.addABook = selectedBook.nameBook;
    var CartBook = [];    //lưu trữ bộ nhớ tạm cho localStorage "CartBook"
    var dem = 0;            //Vị trí thêm sách mới vào localStorage "CartBook" (nếu sách chưa tồn tại)
    var temp = 0;           // đánh dấu nếu đã tồn tại sách trong localStorage "CartBook" --> count ++
    // nếu localStorage "CartBook" không rỗng

    if (localStorage.getItem('CartBook') != null) {
      //chạy vòng lặp để lưu vào bộ nhớ tạm ( tạo mảng cho Object)

      for (var i = 0; i < JSON.parse(localStorage.getItem("CartBook")).length; i++) {
        CartBook[i] = JSON.parse(localStorage.getItem("CartBook"))[i];
        // nếu id book đã tồn tại trong  localStorage "CartBook" 
        if (CartBook[i]._id == selectedBook._id) {
          temp = 1;  //đặt biến temp
          // nếu số lượng tối đa chỉ được 10 mỗi quốn sách , tính luôn đã có trong giỏ thì oke
          if (parseInt(CartBook[i].count) + 1 <= 10) {
            CartBook[i].count = parseInt(CartBook[i].count) + 1;  //tăng giá trị count
            //cập nhật cartbook vào db
            this.putCartBookDB(CartBook[i]);
          }
          else {
            //show alert
            this.checkedAddBook = false;
            //update lại số lượng 


            this.alertMessage = "Đã tồn tại 10 quốn sách " + CartBook[i].nameBook + " trong giỏ hàng";
            this.alertFalse = true;
            setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
          }
        }
        dem++;  // đẩy vị trí gán tiếp theo
      }
    }

    if (temp != 1) {      // nếu sách chưa có ( temp =0 ) thì thêm sách vào
      selectedBook.count = 1;  // set count cho sách
      CartBook[dem] = selectedBook; // thêm sách vào vị trí "dem" ( vị trí cuối) 
      //lưu cartbook vào db
      this.postCartBookDB(selectedBook);
    }
    // đổ mảng vào localStorage "CartBook"
    localStorage.setItem("CartBook", JSON.stringify(CartBook));

    this.getTotalCountAndPrice();
    //  //show alert
    //  this.alertMessage="Thêm thành công sách "+ selectedBook.nameBook +" vào giỏ hàng";
    //  this.alertSucess=true;
    //  setTimeout(() => {this.alertMessage="";this.alertSucess=false}, 6000); 

  }

  //get total count and price 
  TongTien = 0;
  TongCount = 0;
  CartBook = [];
  lengthCartBook = 0;
  getTotalCountAndPrice() {
    this.TongTien = 0;
    this.TongCount = 0;
    this.CartBook = JSON.parse(localStorage.getItem("CartBook"));
    this.cartBookLength(this.CartBook);
    if (this.CartBook != null) {
      for (var i = 0; i < this.lengthCartBook; i++) {
        this.TongTien += parseInt((parseInt(this.CartBook[i].priceBook) * parseInt(this.CartBook[i].count) * (100 - this.CartBook[i].sale) / 100).toFixed(0));
        this.TongCount += parseInt(this.CartBook[i].count);

      }
    }
    $('#tongtien').html("&nbsp;" + this.formatCurrency(this.TongTien.toString()));
    $('.cart_items').html(this.TongCount.toString());
    localStorage.setItem("TongTien", this.TongTien.toString());
    localStorage.setItem("TongCount", this.TongCount.toString());
  }
  //#endregion
  formatCurrency(number) {
    var n = number.split('').reverse().join("");
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");
    return n2.split('').reverse().join('') + 'VNĐ';
  }
  // set độ dài của giỏ hàng
  cartBookLength(CartBook) {
    if (CartBook == null) {
      this.lengthCartBook = 0;
    } else {
      this.lengthCartBook = CartBook.length;
    }
  }

  // go to cart book
  goToCartBook() {
    this._router.navigate(['/cartBook']);
  }

  startPage: Number;
  paginationLimit: Number;

  startPageCategories: Number;
  paginationLimitCategories: Number;
  showMoreItems() {
    this.paginationLimit = this.authorService.authors.length;
  }
  showLessItems() {
    this.paginationLimit = 5;
  }
  showMoreCategories() {
    this.paginationLimitCategories = this.bookCategoryService.categories.length;
  }
  showLessCategories() {
    this.paginationLimitCategories = 5;
  }

  postCartBookDB(selectedBook: Book) {
    if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
      this.cartBookDB.userID = this.accountSocial._id;
      this.cartBookDB.bookID = selectedBook._id;
      this.cartBookDB.count = selectedBook.count;
      this._cartBookDB.postCartBook(this.cartBookDB).subscribe(
        req => {
          console.log(req);
        },
        error => console.log(error)
      );
    }
  }
  putCartBookDB(selectedBook: Book) {
    if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
      this.cartBookDB.userID = this.accountSocial._id;
      this.cartBookDB.bookID = selectedBook._id;
      this.cartBookDB.count = selectedBook.count;
      this._cartBookDB.putCartBook(this.cartBookDB).subscribe(
        req => {
          console.log(req);
        },
        error => console.log(error)
      );
    }
  }

 // favorite Book
 favoriteBook(bookID){
  if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
  this.favorite.bookID=bookID;
  this.favorite.userID=this.accountSocial._id
  this._favoriteService.postFavorite(this.favorite).subscribe(
    aFavorite=>{ // aFavorite sẽ trả về all favorite by userID
      this.listFavorite = aFavorite as Favorite[];
  })
}else{
  this.alertMessage = "Bạn phải đăng nhập để thực hiện thao tác này";
  this.alertFalse = true;
  setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
}
}
getAllFavoriteByUserId(){
  if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
  this._favoriteService.getAllFavoriteByUserID(this.accountSocial._id).subscribe(
    listFavorites =>{
      this.listFavorite = listFavorites as Favorite[];
    }
  )
}
}
//validate favorite 
validateFavorite(id) {
if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
for(let index in this.listFavorite)
{
  if(id==this.listFavorite[index].bookID)
  return true;
}
return false
}
return false
}

}

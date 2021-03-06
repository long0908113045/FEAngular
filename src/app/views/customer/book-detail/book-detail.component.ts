import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../../app-services/author-service/author.service';
import { Author } from '../../../app-services/author-service/author.model';
import { CategoryService } from '../../../app-services/category-service/category.service';
import { Category } from '../../../app-services/category-service/category.model';
import { BookService } from '../../../app-services/book-service/book.service';
import { Book } from '../../../app-services/book-service/book.model';
import { RatingService } from '../../../app-services/rating-service/rating.service';
import { Rating } from '../../../app-services/rating-service/rating.model';
import { NgForm } from '@angular/forms';
import { SocialaccountService } from '../../../app-services/socialAccount-service/socialaccount.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { UserService } from '../../../app-services/user-service/user.service';
import { User } from '../../../app-services/user-service/user.model';
import { SocialAccount } from 'src/app/app-services/socialAccount-service/socialaccount.model';
import { CartBookService } from 'src/app/app-services/cartBook-service/cartBook.service';
import { CartBook } from 'src/app/app-services/cartBook-service/cartBook.model';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FavoriteService } from '../../../app-services/favorite-service/favorite.service'
//dataset Recommend
import { datasetRecommend } from '../../../app-services/recommendSys-service/dataRecommend-service/dataRecommend.model'
import { DatasetRecommendService } from 'src/app/app-services/recommendSys-service/dataRecommend-service/dataRecommend.service';
//favorite
import { Favorite } from 'src/app/app-services/favorite-service/favorite.model';

declare var $: any

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
//open modal
export class BookDetailComponent implements OnInit {
  public linkRead: string;
  private subscription: Subscription;
  private timer: Observable<any>;
  pageOfItems: Array<any>;
  books: Array<Book>;
  id_category: String = ""
  // loginBy: String = ""
  // statusLogin: String = ""
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  cartBookDB: CartBook = new CartBook;
  datasetRecommend : datasetRecommend = new datasetRecommend;
  constructor(private _router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private authorService: AuthorService, private bookService: BookService,private categoryService: CategoryService,
    private ratingService: RatingService, private accountSocialService: SocialaccountService,
    private userService: UserService, private _cartBookDB: CartBookService,
    private _favoriteService: FavoriteService, private _datasetRecommend : DatasetRecommendService) {
    //#region js for star
    var wc_single_product_params = { "i18n_required_rating_text": "Please select a rating", "review_rating_required": "yes" };
    $(function (a) {
      return "undefined" != typeof wc_single_product_params && (a("body")
        .on("init", ".wc-tabs-wrapper, .woocommerce-tabs", function () {
          a(".wc-tab, .woocommerce-tabs .panel:not(.panel .panel)").hide();
          var b = window.location.hash, c = window.location.href, d = a(this).find(".wc-tabs, ul.tabs").first();
          b.toLowerCase().indexOf("comment-") >= 0 || "#reviews" === b || "#tab-reviews" === b ? d.find("li.reviews_tab a")
            .click() : c.indexOf("comment-page-") > 0 || c.indexOf("cpage=") > 0 ? d.find("li.reviews_tab a").click() : d.find("li:first a").click()
        })
        .on("click", ".wc-tabs li a, ul.tabs li a", function (b) {
          b.preventDefault();
          var c = a(this), d = c.closest(".wc-tabs-wrapper, .woocommerce-tabs"), e = d.find(".wc-tabs, ul.tabs"); e.find("li")
            .removeClass("active"), d.find(".wc-tab, .panel:not(.panel .panel)").hide(), c.closest("li").addClass("active"),
            d.find(c.attr("href")).show()
        }).on("click", "a.woocommerce-review-link", function () {
          return a(".reviews_tab a")
            .click(), !0
        }).on("init", "#rating", function () {
          a("#rating").hide()
            .before('<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>')
        })
        .on("click", "#respond p.stars a", function () {
          var b = a(this), c = a(this).closest("#respond").find("#rating"),
            d = a(this).closest(".stars"); return c.val(b.text()), b.siblings("a").removeClass("active"), b.addClass("active"),
              d.addClass("selected"), !1
        }).on("click", "#respond #submit", function () {
          var b = a(this).closest("#respond")
            .find("#rating"), c = b.val(); if (b.length > 0 && !c && "yes" === wc_single_product_params.review_rating_required)
            return window.alert(wc_single_product_params.i18n_required_rating_text), !1
        }),
        void a(".wc-tabs-wrapper, .woocommerce-tabs, #rating").trigger("init"))
    });
    //#endregion
  }
  customOptions: any
  //ch???a th??ng tin gi??? h??ng
  CartBook = [];
  TongTien = 0;
  TongCount = 0;
  lengthCartBook = 0;
  myThumbnail = "https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage = "https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  userID_bookID = { userID: "", bookID: "" }
  IsRate = false
  idBook = this.route.snapshot.paramMap.get('id');
  ListRatingAccount:any
  favorite: Favorite = new Favorite
  listFavorite :any

  ngOnInit() {
    $('.searchHeader').attr('style', 'font-size: 1rem !important');
    $('.wrapper a img').attr('style', 'border: 1px solid transparent !important');
    $('.wrapper a img').attr('style', 'border: 1px solid transparent !important');
    $('#username').attr('style', 'font-size: 16px !important;background-color: transparent;border-color: transparent;color: green;');
    $(function () {
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });
      $('#moreRating').click(function () {
        $('html,body').animate({
          scrollTop: $("#ratingList").offset().top
        },
          'slow');
      });

      $('.bar span').hide();
      $('#bar-five').animate({
        width: '75%'
      }, 1000);
      $('#bar-four').animate({
        width: '35%'
      }, 1000);
      $('#bar-three').animate({
        width: '20%'
      }, 1000);
      $('#bar-two').animate({
        width: '15%'
      }, 1000);
      $('#bar-one').animate({
        width: '30%'
      }, 1000);

      setTimeout(function () {
        $('.bar span').fadeIn('slow');
      }, 1000);

      $('#imgFamiliar').click(function () {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        // $('#modalImgFamiliar').modal('show');
        alert($(this).find('img').attr('src'));
      });
      $('#dislike').click(function () {
        $('.fa').css('color', 'red')
      });
    });
    //#endregion
    this.resetForm();
    this.getAllFavoriteByUserId();
    //set ????? d??i cartBook
    this.cartBookLength(this.CartBook);
    //set value gi??? h??ng tr??n thanh head
    this.getTotalCountAndPrice();
    this.DataSetRecommend(this.idBook,0,0,1);
    this.getListRatingAccount(this.idBook)
    this.getBookById(this.idBook);
    // this.getAllAccount();
    this.getRatingsByBookID(this.idBook);
    // this.getAllUsers();
    // this.getRatinngAverage(this.idBook);


  }


  // set ????? d??i c???a gi??? h??ng
  cartBookLength(CartBook) {
    if (CartBook == null) {
      this.lengthCartBook = 0;
    } else {
      this.lengthCartBook = CartBook.length;
    }
  }
  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe(res => {
  //     this.userService.users = res as User[];
  //     console.log(this.userService.users);
  //   })
  // }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  //get total count and price
  getTotalCountAndPrice() {
    this.TongTien = 0;
    this.TongCount = 0;
    this.CartBook = JSON.parse(localStorage.getItem("CartBook"));
    this.cartBookLength(this.CartBook);
    if (this.CartBook != null) {
      for (var i = 0; i < this.lengthCartBook; i++) {
        this.TongTien += parseInt((parseInt(this.CartBook[i].priceBook) * parseInt(this.CartBook[i].count)*(100-this.CartBook[i].sale)/100).toFixed(0));
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
    return n2.split('').reverse().join('') + 'VN??';
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.ratingService.rating = {
      _id: "",
      bookID: "",
      userID: "",
      star: "",
      review: ""
    };
  }
  getAuthorById(id: string) {
    this.authorService.getAuthorById(id).subscribe((res) => {
      this.authorService.author = res as Author;
      // console.log(res);
    });
  }

  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe((res) => {
      this.categoryService.category = res as Category;
      // console.log(res);
    });
  }

  detailBook(book: Book) {
    return this._router.navigate(["/bookDetail" + `/${book._id}`]);
  }

  getBookById(id: string) {
    var books: any
    this.bookService.getBookById(id).subscribe((res) => {
      this.bookService.selectedBook = res as Book;
      books = res;
      this.getAuthorById(books.authorID);
      this.getCategoryById(books.categoryID);
      this.gettypeCategory(books.categoryID);
      this.getRatingsByBookID(id);
      window.scrollTo(0, 0)
      this.checkGetCountBookDetailEqual10(id);
      this.linkRead = this.bookService.selectedBook.tryRead;
      // this.getRatingAverageByBook(id);
      this.userID_bookID.bookID = this.bookService.selectedBook._id;
      this.userID_bookID.userID = JSON.parse(localStorage.getItem('accountSocial'))._id;

      this.ratingService.getRatingByUserIDBookID(this.userID_bookID).subscribe(
        data => {
          console.log("hello")
          console.log(data)

          this.ratingService.rating = Object.values(data)[0];
          $(".description_tab").addClass("active")
          $(".reviews_tab").removeClass("active")
          $("#tab-description").css("display","block")
          $("#tab-reviews").css("display","none")
        },
        error => console.log(error)
      );
    });
  }
  gettypeCategory(id) {
    this.bookService.getBookByCategoryId(id)
      .subscribe(resCategoryData => {
        // console.log(resCategoryData);
        this.books = resCategoryData as Book[];
        // console.log(this.books);
      });
  }
  account_social = [];
  getRatingsByBookID(id: string) {
    this.ratingService.getRatingsByBook(id).subscribe((res) => {
      this.ratingService.ratings = res as Rating[];
      //console.log("Books By Id");
      //console.log(res)
    });
  }

  getListRatingAccount(id:string){
    this.ratingService.getListRatingAccount(id).subscribe((res) => {
      this.ListRatingAccount = res
      this.startPageRatings = 0;
      this.paginationLimitRatings = 3;
    });
  }
  // getAllAccount() {
  //   this.accountSocialService.getAllAccountSocial().subscribe(res => {
  //     this.accountSocialService.socialAccounts = res as SocialAccount[];
  //   })
  // }
  statusRating: boolean = false;

  onSubmit(form: NgForm) {

    // this.statusLogin = localStorage.getItem('statusLogin');
    // this.loginBy = localStorage.getItem('loginBy')

    if (this.accountSocial != null) {
      let book_id = this.route.snapshot.paramMap.get('id');
      form.value.bookID = book_id;
      let id_user = JSON.parse(localStorage.getItem('accountSocial'))._id;
      form.value.userID = id_user;

      this.DataSetRecommend(book_id,0, form.value.star,0);
      this.ratingService.getRatingByUserIDBookID(form.value).subscribe(
        data => {

          //n???u c?? r???i th?? update
          if (Object.keys(data).length > 0 && Object.values(data)[0].star !=0 ) { //
            this.UpdateRating(form);

          } else { //ch??a c?? th?? insert
            this.PostRating(form);
          }
          this.ngOnInit()
        },
        error => console.log(error)
      );

    }
  }
  UpdateRating(form) {
    console.log("update rate")
    this.ratingService.UpdateRating(form.value).subscribe(
      dataUpdate => {
        console.log(dataUpdate)
        this.statusRating = true;
        form.resetForm();
        this.ngOnInit();
        this.timer = Observable.timer(5000); // 5000 millisecond means 5 seconds
        this.subscription = this.timer.subscribe(() => {
          // set showloader to false to hide loading div from view after 5 seconds
          this.statusRating = false;
        });
      },
      error => console.log(error)
    );
  }
  PostRating(form) {
    console.log("post rate")
    this.ratingService.postRating(form.value).subscribe(
      dataPost => {
        // console.log(data);
        console.log(dataPost)
        this.statusRating = true;
        form.resetForm();
        this.ngOnInit();
        this.timer = Observable.timer(5000); // 5000 millisecond means 5 seconds
        this.subscription = this.timer.subscribe(() => {
          // set showloader to false to hide loading div from view after 5 seconds
          this.statusRating = false;
        });
      },
      error => console.log(error)
    );
  }
  // s??? l?????ng add t???i ??a ch??? ???????c 10 m???i qu???n s??ch , t??nh lu??n ???? c?? trong gi???
  //##1 s??? ki???n change input
  alertFalse = false;
  alertMessage = "";
  checkedAddBook = true;
  countBookDetailCur = 0;
  getcountDetail(selectedBook: Book, event: any) {

    this.checkedAddBook = true;
    //console.log(this.countBookDetailCur);
    //n???u nh???p 0
    if (event.target.value == 0) {
      //show alert
      this.checkedAddBook = false;
      this.alertMessage = "B???n kh??ng th??? mua s??ch v???i s??? l?????ng b???ng 0";
      this.alertFalse = true;
      setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
    }
    else
      if (event.target.value > 10) {
        //show alert
        this.checkedAddBook = false;


        this.alertMessage = "B???n ch??? ???????c nh???p t???i ??a 10 qu???n s??ch";
        this.alertFalse = true;
        setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
      } else {
        var CountMax10 = parseInt(event.target.value) + (this.countBookDetailCur);


        if (CountMax10 > 10) {
          //show alert
          this.checkedAddBook = false;
          //update l???i s??? l?????ng

          this.alertMessage = "s??? l?????ng t???i ??a ch??? ???????c 10 m???i qu???n s??ch , t??nh lu??n ???? c?? trong gi??? h??ng";
          this.alertFalse = true;
          setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
        }
      }
    if (!this.checkedAddBook) {
      $("#count").val(1);
    }
    console.log(this.checkedAddBook);
  }

  paginationLimit: Number;

  startPageRatings: Number;
  paginationLimitRatings: Number;
  showMoreItems() {
    this.paginationLimit = this.ListRatingAccount.length;
  }
  showLessItems() {
    this.paginationLimit = 5;
  }
  showMoreRatings() {
    this.paginationLimitRatings = this.ListRatingAccount.length;
  }
  showLessRatings() {
    this.paginationLimitRatings = 3;
  }

  // s??? l?????ng add t???i ??a ch??? ???????c 10 m???i qu???n s??ch , t??nh lu??n ???? c?? trong gi???
  //##2 khi s??? l?????ng ???? 10 , ko nh???n change input , nh???n add to cart-->fail
  checkGetCountBookDetailEqual10(id) {
    this.checkedAddBook = true;
    for (var i = 0; i < this.lengthCartBook; i++) {
      if (this.CartBook[i]._id == id) {
        this.countBookDetailCur = this.CartBook[i].count;

        if (this.CartBook[i].count == 10) {
          //show alert
          this.checkedAddBook = false;
          //update l???i s??? l?????ng
        }
      }
    }

  }

  //add to cart (BookDetail,CountSelect)
  nameBookShowOnModel = ""
  addToCart(selectedBook: Book, form: Book) {
    this.nameBookShowOnModel = selectedBook.nameBook;
    this.checkedAddBook = true;
    var CartBook = [];    //l??u tr??? b??? nh??? t???m cho localStorage "CartBook"
    var dem = 0;            //V??? tr?? th??m s??ch m???i v??o localStorage "CartBook" (n???u s??ch ch??a t???n t???i)
    var temp = 0;           // ????nh d???u n???u ???? t???n t???i s??ch trong localStorage "CartBook" --> count ++
    // n???u localStorage "CartBook" kh??ng r???ng
    if (!form.count || form.count + this.countBookDetailCur > 10) form.count = 1;
    // n???u s??? l?????ng nh???p v??o <=10 th?? oke
    if (form.count <= 10) {
      if (localStorage.getItem('CartBook') != null) {
        //ch???y v??ng l???p ????? l??u v??o b??? nh??? t???m ( t???o m???ng cho Object)
        if (!form.count) form.count = 1;
        for (var i = 0; i < this.lengthCartBook; i++) {
          CartBook[i] = JSON.parse(localStorage.getItem("CartBook"))[i];
          // n???u id book ???? t???n t???i trong  localStorage "CartBook"
          if (CartBook[i]._id == selectedBook._id) {
            temp = 1;  //?????t bi???n temp
            // n???u s??? l?????ng t???i ??a ch??? ???????c 10 m???i qu???n s??ch , t??nh lu??n ???? c?? trong gi??? th?? oke
            if (parseInt(CartBook[i].count) + form.count <= 10) {
              CartBook[i].count = parseInt(CartBook[i].count) + form.count;  //t??ng gi?? tr??? count
              //c???p nh???t cartbook v??o db
              this.putCartBookDB(CartBook[i]);
            }
            else {
              if (this.countBookDetailCur == 10) {
                //show alert
                this.checkedAddBook = false;
                //update l???i s??? l?????ng
                this.alertMessage = "???? t???n t???i 10 qu???n s??ch " + CartBook[i].nameBook + " trong gi??? h??ng";
                this.alertFalse = true;
                setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
              }
            }
          }
          dem++;  // ?????y v??? tr?? g??n ti???p theo
        }
      }
      if (temp != 1) {      // n???u s??ch ch??a c?? ( temp =0 ) th?? th??m s??ch v??o

        selectedBook.count = form.count;  // set count cho s??ch
        CartBook[dem] = selectedBook; // th??m s??ch v??o v??? tr?? "dem" ( v??? tr?? cu???i)
        //l??u cartbook v??o db
        this.postCartBookDB(selectedBook);

      }
      localStorage.setItem("CartBook", JSON.stringify(CartBook));
    }
    this.ngOnInit();
  }
  //continueShopping
  goToHome() {
    this._router.navigate(['/homePage']);
  }
  // go to cart book
  goToCartBook() {
    this._router.navigate(['/cartBook']);
  }
  clickAddBookOnModel(selectedBook: Book) {
    this.nameBookShowOnModel = selectedBook.nameBook;
    var CartBook = [];    //l??u tr??? b??? nh??? t???m cho localStorage "CartBook"
    var dem = 0;            //V??? tr?? th??m s??ch m???i v??o localStorage "CartBook" (n???u s??ch ch??a t???n t???i)
    var temp = 0;           // ????nh d???u n???u ???? t???n t???i s??ch trong localStorage "CartBook" --> count ++
    // n???u localStorage "CartBook" kh??ng r???ng
    if (localStorage.getItem('CartBook') != null) {
      //ch???y v??ng l???p ????? l??u v??o b??? nh??? t???m ( t???o m???ng cho Object)

      for (var i = 0; i < JSON.parse(localStorage.getItem("CartBook")).length; i++) {
        CartBook[i] = JSON.parse(localStorage.getItem("CartBook"))[i];
        // n???u id book ???? t???n t???i trong  localStorage "CartBook"
        if (CartBook[i]._id == selectedBook._id) {
          temp = 1;  //?????t bi???n temp
          // n???u s??? l?????ng t???i ??a ch??? ???????c 10 m???i qu???n s??ch , t??nh lu??n ???? c?? trong gi??? th?? oke
          if (parseInt(CartBook[i].count) + 1 <= 10) {
            CartBook[i].count = parseInt(CartBook[i].count) + 1;  //t??ng gi?? tr??? count
            //c???p nh???t cartbook v??o db
            this.putCartBookDB(CartBook[i]);
          }
          else {
            //show alert
            this.checkedAddBook = false;
            //update l???i s??? l?????ng


            this.alertMessage = "???? t???n t???i 10 qu???n s??ch " + CartBook[i].nameBook + " trong gi??? h??ng";
            this.alertFalse = true;
            setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
          }
        }
        dem++;  // ?????y v??? tr?? g??n ti???p theo
      }
    }
    if (temp != 1) {      // n???u s??ch ch??a c?? ( temp =0 ) th?? th??m s??ch v??o
      selectedBook.count = 1;  // set count cho s??ch
      CartBook[dem] = selectedBook; // th??m s??ch v??o v??? tr?? "dem" ( v??? tr?? cu???i)
      //l??u cartbook v??o db
      this.postCartBookDB(selectedBook);
    }
    // ????? m???ng v??o localStorage "CartBook"
    localStorage.setItem("CartBook", JSON.stringify(CartBook));

    this.getTotalCountAndPrice();
  }
  clickGoToBookDetail(id) {
    // this.cartBookLength(this.CartBook);
    //set value gi??? h??ng tr??n thanh head
    // this.getTotalCountAndPrice();
    // this.getBookById(id);
    // this.getAllAccount();
    // this.getRatingsByBookID(id);
    // this.getAllUsers();
    // this.getRatinng(id);
    // this.DataSetRecommend(id,0,0,1);
    this.idBook= id
    this.ngOnInit()
    return this._router.navigate(["/bookDetail" + '/' +id]);


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
  getRatingByBook: any

  DataSetRecommend(bookId,buy,rate,view){
    if(this.accountSocial!=null){
      this.datasetRecommend.userID = this.accountSocial._id;
      this.datasetRecommend.bookID = bookId;
      //c??c value == 0 tr??? click xem = 1  ...--> v??o trong backend s??? t??? c???ng
      this.datasetRecommend.buy =buy ;
      this.datasetRecommend.rate=rate;
      this.datasetRecommend.click=view;
      console.log(this.datasetRecommend)
      this._datasetRecommend.putOrPostDatasetRecommend(this.datasetRecommend).subscribe(
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
			aFavorite=>{ // aFavorite s??? tr??? v??? all favorite by userID
				this.listFavorite = aFavorite as Favorite[];
		})
	}else{
		this.alertMessage = "B???n ph???i ????ng nh???p ????? th???c hi???n thao t??c n??y";
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

import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../../app-services/book-service/book.model';
import { CartBookService } from 'src/app/app-services/cartBook-service/cartBook.service';
import { CartBook } from 'src/app/app-services/cartBook-service/cartBook.model';
import { DiscountCodeService } from 'src/app/app-services/discountCode-Service/discountCode.service';
import { DiscountCode } from 'src/app/app-services/discountCode-Service/discountCode.model';
import { BookService } from 'src/app/app-services/book-service/book.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { truncateSync } from 'fs';
//promotion
import { Promotion } from 'src/app/app-services/promotion-service/promotion.model';
import { PromotionService } from 'src/app/app-services/promotion-service/promotion.service';
declare var $: any;
@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.css'],

})
export class BookCartComponent implements OnInit {
  helper = new JwtHelperService();
  token: any = this.helper.decodeToken(localStorage.getItem('token'));
  constructor(private _router: Router, private _cartBookDB: CartBookService,
    private _discountCode: DiscountCodeService, private _book: BookService,
    private _cartBookDBService: CartBookService, private _promotion: PromotionService) {

  }
  //#region Buộc phải có trên các component
  //chứa thông tin giỏ hàng
  CartBook = [];
  ListBookSameCartBook = []
  // Lưu tổng tiền và tổng số lượng chung
  TongTien = 0;
  TongCount = 0;
  //thông tin login 
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  statusLogin = localStorage.getItem('statusLogin');
  //#endregion

  // kiểm tra giỏ hàng rỗng
  checkViewCart = false;
  lengthCartBook = 0;
  //alert
  alertMessage = "";
  alertSucess = false;
  alertFalse = false;
  cartBookDB: CartBook = new CartBook;
  discountCode: DiscountCode = new DiscountCode;

  ngOnInit() {
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');

    if (localStorage.getItem('DiscountCode') != null) {
      this.discountCode = JSON.parse(localStorage.getItem('DiscountCode'));
    } else {
      this.discountCode.discountCode = 0;
    }

    // if (localStorage.getItem('Promotion') != null) {
    //   this.promotion = JSON.parse(localStorage.getItem('Promotion'));
    // } else {
    //   this.promotion.discount = 0;
    // }


    $(function () {
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });

    });

    //#region Buộc phải có trên các component
    this.verifyCartBook()
    //get giỏ hàng
    this.CartBook = JSON.parse(localStorage.getItem("CartBook"));
    //set độ dài cartBook
    this.cartBookLength(this.CartBook);
    //set value giỏ hàng trên thanh head 
    this.getTotalCountAndPrice();
    //#endregion

    // Hiện ra label khi giỏ hàng rỗng
    this.CheckViewCart();
    //valid quantity và rate trong cartBook
    this.get3Promotion()
  }
  unUseDiscountCode() {
    localStorage.removeItem('DiscountCode');
    this.ngOnInit();
  }
  //#region Buộc phải có trên các component
  quantity: number = 1;
  i = 1
  plus(id) {
    for (let j = 0; j < this.CartBook.length; j++) {
      if (this.CartBook[j]._id == id) {
        if (this.CartBook[j].count < 10) {
          this.CartBook[j].count++;
          this.updateCartBook(this.CartBook[j]._id, this.CartBook[j].count);
        }
        else {
          this.alertMessage = "Bạn chỉ được nhập tối đa 10 quốn sách";
          this.alertFalse = true;
          setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
        }
      }

    }
  }
  minus(id) {
    for (let j = 0; j < JSON.parse(localStorage.getItem("CartBook")).length; j++) {
      if (this.CartBook[j]._id == id) {
        if (this.CartBook[j].count > 1) {
          this.CartBook[j].count--;
          this.updateCartBook(this.CartBook[j]._id, this.CartBook[j].count);
        }
        else {
          this.deleteCartBook(id)
        }
      }
    }
  }
  // set độ dài của giỏ hàng
  cartBookLength(CartBook) {
    if (CartBook == null) {
      this.lengthCartBook = 0;
    } else {
      this.lengthCartBook = CartBook.length;
    }
  }

  //get total count and price trên header
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
  //check header giỏ hàng
  CheckViewCart() {
    if (this.CartBook == null || this.lengthCartBook == 0) {
      this.checkViewCart = true;
    }
    else {
      this.checkViewCart = false;
    }
  }


  // cờ hiệu của alert
  checkedAddBook = true;
  //get count onChange --> updateCartBook
  getCountUpdate(event: any, id) {
    console.log(event.target.value);
    this.checkedAddBook = true;
    // kiểm tra xem có lớn hơn 10 ko
    if (event.target.value <= 10) {
      console.log("update");
      this.updateCartBook(id, event.target.value);
    } else {
      //show alert
      this.checkedAddBook = false;
      //update lại số lượng 
      localStorage.setItem("CartBook", JSON.stringify(this.CartBook));
      this.ngOnInit();
      this.alertMessage = "Bạn chỉ được nhập tối đa 10 quốn sách";
      this.alertFalse = true;
      setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
    }
  }
  //Update Cart Book
  resany: any
  updateCartBook(id, count) {
    //kiểm tra book[id].count có bằng 0 không ,... nếu =0 thì ==> gửi qua hàm xóa
    if (this.checkedAddBook) {
      for (var i = 0; i < this.lengthCartBook; i++) {
        //tìm id được chọn để edit 
        if (this.CartBook[i]._id == id) {
          if (count == 0) {
            this.deleteCartBook(id);
            localStorage.setItem("CartBook", JSON.stringify(this.CartBook));
            this.ngOnInit();
          }
          else {
            this._book.getBookById(id).subscribe(
              abook => {
                this.resany = abook as Book
                this.CartBook[i].quantity = this.resany.quantity;
                this.CartBook[i].count = count;
                this.CartBook[i].rate = this.resany.rate;
                //update cartbook DB
                this.putCartBookDB(this.CartBook[i]);
                localStorage.setItem("CartBook", JSON.stringify(this.CartBook));
                this.ngOnInit();
              })
          }
          break;
        }
      }
    }
  }
  // Delete Cart Book
  deleteCartBook(id) {
    Swal.fire({
      text: "Bạn có chắc muốn xóa sản phẩm này trong giỏ hàng ?",
      icon: 'warning',
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      cancelButtonText: 'Cancel'
    })
      .then((willDelete) => {
        if (willDelete) {
          for (var i = 0; i < this.lengthCartBook; i++) {
            if (this.CartBook[i]._id == id) {
              this.deleteOneCartBookDB(this.CartBook[i]);
              this.CartBook.splice(i, 1);
              break;
            }
          }
          Swal.fire({
            title: "Đã xóa xong!",
            text: "Sách này đã được xóa trong giỏ hàng.",
            icon: 'success'
          });
          localStorage.setItem("CartBook", JSON.stringify(this.CartBook));
        }
        this.ngOnInit();
      });

  }
  //click vào hình chuyển về detail
  ViewBookDetail(idBook) {
    return this._router.navigate(["/bookDetail" + `/${idBook}`]);
  }

  checkoutWhenNull() {
    var setconfirm = confirm('Giỏ hàng của bạn đang trống , bạn có muốn dạo mua một vòng không ?')
    if (setconfirm == true) {
      this.goToHome();
    }
  }
  goToHome() {
    this._router.navigate(['/homePage']);
  }

  CheckQuantiTy() {
    for (let index in this.CartBook) {
      if (this.CartBook[index].quantity < this.CartBook[index].count) {
        return false
      }
    }
    return true
  }
  goToShipping() {

    if (this.token == null) {
      this._router.navigate(['/account']);
    } else if (this.CheckQuantiTy() == false) {
      this.alertMessage = "Hiện Không Đáp Ứng Được Đơn Hàng Của Bạn ! \nVui Lòng Kiểm Tra Lại Số Lượng Giỏ Hàng";
      this.alertFalse = true;
      setTimeout(() => { this.alertMessage = ""; this.alertFalse = false }, 4000);
    } else {
      let token_exp = this.token.exp;
      let time_now = new Date().getTime() / 1000;
      if (time_now < token_exp) {
        this._router.navigate(['/shipping']);
      } else {
        // alert("Token is valid");
        localStorage.removeItem("accountSocial");
        localStorage.removeItem("token");
        localStorage.removeItem("loginBy");
        localStorage.removeItem("statusLogin");
        // this._router.navigate(['/account']);
        this.alertMessage = "Phiên làm việc của bạn đã hết hạn! Vui lòng đăng nhập lại!";
        this.alertFalse = true;
        setTimeout(() => { document.location.href = '/account'; }, 2000);
      }
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
  deleteOneCartBookDB(selectedBook: Book) {
    if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
      this.cartBookDB.userID = this.accountSocial._id;
      this.cartBookDB.bookID = selectedBook._id;
      this.cartBookDB.count = selectedBook.count;
      this._cartBookDB.deleteOneCartBook(this.cartBookDB).subscribe(
        req => {
          console.log(req);
        },
        error => console.log(error)
      );
    }
  }
  goToDiscountCode() {
    this._router.navigate(['/discountCode']);
  }
  //dùng dể verify số lượng và sao 
  verifyCartBook() {
    if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
      this._cartBookDBService.getAllCartBookDBByUserID(this.accountSocial._id).subscribe(
        cartBookDB => {
          this.CartBook = cartBookDB as Book[]
          localStorage.setItem("CartBook", JSON.stringify(this.CartBook));
        })
    }
  }

  //get 3 promotion
  ListPromotion: any
  get3Promotion() {
    this._promotion.getTop3Promotion().subscribe(list => {
      this.ListPromotion = list as Promotion
      this.ListPromotion = this.sortPromotion(this.ListPromotion)
      this.CheckBarPromotion()
    })
  }
  sortPromotion(Promotion) {
    return Promotion.sort(function (a, b) {
      return a.ifDiscount - b.ifDiscount;
    });
  }
  promotionDiscount = []
  CheckBarPromotion() {
    if (this.ListPromotion.length > 0) {
      var index=0;
      for (var item of this.ListPromotion) {
        if(this.ListPromotion.length ==1){  //voi1 1 1phan tu
          if( this.TongTien < this.ListPromotion[index].ifDiscount)
          {
            this.promotionDiscount[0] = 0;  //% giảm giá
            this.promotionDiscount[1] = this.ListPromotion[index].ifDiscount;  
          }
          else{
            this.promotionDiscount[0] = this.ListPromotion[index].discount;  //% giảm giá
            this.promotionDiscount[1] = this.ListPromotion[index].ifDiscount;   
          }
          this.promotionDiscount[2] = this.ListPromotion[index].discount;   //% now
          this.promotionDiscount[3] = this.ListPromotion[index].ifDiscount;   //% now
          console.log("mang 1 phan tu")
          break;
        }
        //dung dau mang
        if (index == 0 && this.TongTien < this.ListPromotion[index].ifDiscount) { 
          this.promotionDiscount[0] = 0;  //% giảm giá
          this.promotionDiscount[1] = this.ListPromotion[index].ifDiscount;  
          this.promotionDiscount[2] = this.ListPromotion[index].discount;   //% now
          this.promotionDiscount[3] = this.ListPromotion[index].ifDiscount;   //% now
   
          break;
        }
        //phan giua
        if (index != 0 && this.TongTien >= this.ListPromotion[index - 1].ifDiscount && this.TongTien < this.ListPromotion[index].ifDiscount) {
          this.promotionDiscount[0] = this.ListPromotion[index - 1].discount;  //% giảm giá
          this.promotionDiscount[1] = this.ListPromotion[index - 1].ifDiscount; 
          this.promotionDiscount[2] = this.ListPromotion[index].discount; //% now
          this.promotionDiscount[3] = this.ListPromotion[index].ifDiscount;   //% now
         
          break;
        }
        //phan cuoi
        if (index!=0 && index == this.ListPromotion.length - 1 && this.TongTien > this.ListPromotion[index].ifDiscount) {
          this.promotionDiscount[0] = this.ListPromotion[index].discount;  //% giảm giá
          this.promotionDiscount[1] = this.ListPromotion[index].ifDiscount;   
            this.promotionDiscount[2] = this.ListPromotion[index].discount;    //% now
            this.promotionDiscount[3] = this.ListPromotion[index].ifDiscount;   //% now
          break;
        }
        
        index++;
      }
      console.log((this.TongTien/this.promotionDiscount[3]*100 ))
      $("#processBar").css("width",  this.TongTien/this.promotionDiscount[3]*100  +"%");
    }else{
      this.promotionDiscount[0] = 0;  //% giảm giá
      this.promotionDiscount[1] =0;   
      this.promotionDiscount[2] =0;   //If discount 
      this.promotionDiscount[3] = 0 ;
    }

  }

}

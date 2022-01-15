import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//favorite
import { BookService } from '../../../app-services/book-service/book.service';
import { Favorite } from 'src/app/app-services/favorite-service/favorite.model';
import { Book } from 'src/app/app-services/book-service/book.model';
import { CartBookService } from 'src/app/app-services/cartBook-service/cartBook.service';
import { CartBook } from 'src/app/app-services/cartBook-service/cartBook.model';
import { FavoriteService } from 'src/app/app-services/favorite-service/favorite.service';
declare var $: any;
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(private _router: Router,private _favoriteService:FavoriteService,	private _cartBookDBService: CartBookService,private bookService: BookService) { }
	alertMessage = "";
	alertSucess = false;
  alertFalse = false;
  TongTien = 0;
	TongCount = 0;
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  statusLogin = localStorage.getItem('statusLogin');
  loginBy: String = ""
  favorite: Favorite = new Favorite
  listFavorite :any
  listBookFavorite:any
  cartBookDB: CartBook = new CartBook;
	CartBook = [];
  lengthCartBook = 0;
  ngOnInit() {
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');
    // if (this.statusLogin == null) { this._router.navigate(['/account']); }
    this.loginBy = localStorage.getItem('loginBy');
    this.getTotalCountAndPrice();
    this.getAllFavoriteByUserId();
    this.getAllBookFavorite();
 
  }
getAllBookFavorite(){
  if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
		this._favoriteService.getAllBookFavoriteByUserID(this.accountSocial._id).subscribe(
			listFavorites =>{
        this.listBookFavorite = listFavorites as Book[];
        console.log(this.listBookFavorite)
			}
		)
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
      this.ngOnInit()
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
    }  )
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







  
  moveToProfileDetail(){
    this._router.navigate(['/accountProfile'])
  }
  moveToProfileAccountSocial(){
    this._router.navigate(['/accountProfileSocial'])
  }
  goToOrderHistory(){
    this._router.navigate(['/orderHistory'])
  }
  goToDiscountCode(){
    this._router.navigate(['/discountCode'])
  }
  goToFavorite(){
    this._router.navigate(['/favorites'])
  }





  //add book
  detailBook(book: Book) {

    return this._router.navigate(["/bookDetail" + `/${book._id}`]);
  }
  


  //#region  Add Book Cart
	postCartBookDB(selectedBook: Book) {
		if (JSON.parse(localStorage.getItem('accountSocial')) != null) {
			this.cartBookDB.userID = this.accountSocial._id;
			this.cartBookDB.bookID = selectedBook._id;
			this.cartBookDB.count = selectedBook.count;
			this._cartBookDBService.postCartBook(this.cartBookDB).subscribe(
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
			this._cartBookDBService.putCartBook(this.cartBookDB).subscribe(
				req => {
					console.log(req);
				},
				error => console.log(error)
			);
		}
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
	}
	addABook = "";

	//add to cart (BookDetail,CountSelect)
	// số lượng tối đa chỉ được 10 mỗi quốn sách , tính luôn đã có trong giỏ

	checkedAddBook = true;
	addToCart(selectedBook: Book) {
		this.getBookByCategory(selectedBook.categoryID)
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
	//#endregion

	goToCartBook(){
		return this._router.navigate(['/cartBook']);
	}
	BookByCategory:any
	getBookByCategory(idCategory){
		this.bookService.getBookByCategoryId(idCategory)
		.subscribe(resCategoryData => {

		  this.BookByCategory = resCategoryData as Book[];

		});
  }
  // set độ dài của giỏ hàng
	cartBookLength(CartBook) {
		if (CartBook == null) {
			this.lengthCartBook = 0;
		} else {
			this.lengthCartBook = CartBook.length;
		}
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
  formatCurrency(number) {
		var n = number.split('').reverse().join("");
		var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");
		return n2.split('').reverse().join('') + 'VNĐ';
	}
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../../app-services/customer-service/Customer.model';
import { OrderService } from '../../../app-services/order-service/order.service';
import { OrderDetailService } from '../../../app-services/orderDetail-service/orderDetail.service';
import { Order } from '../../../app-services/order-service/order.model';
import { OrderDetail } from '../../../app-services/orderDetail-service/orderDetail.model';
import { CustomerService } from '../../../app-services/customer-service/customer.service';
import { Book } from '../../../app-services/book-service/book.model';
import { BookService } from '../../../app-services/book-service/book.service';
declare var $: any;
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private _router: Router, private _order: OrderService, private _customer: CustomerService, 
    private _orderDetail: OrderDetailService, private _book:BookService) { }
  //chứa thông tin giỏ hàng
  CartBook = [];
  list_Orders_CusName = [];
  list_all_customer: Array<Customer>;
  list_Order: Array<Order>;
  list_Order_New=[]   //new
  list_Order_Inpro=[]  //inproject
  list_Order_Done=[]    //done
  list_Order_Cancel=[] //cancel
  list_OrderDetail: Array<OrderDetail>;
  list_Book: Array<Book>;
  TongTien = 0;
  TongCount = 0;
  lengthCartBook = 0;
  expandedIndex=-1
  //thông tin login
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  loginBy: String = ""
  ngOnInit() {
    this.script_Frontend();
    this.getOrderByUserID(this.accountSocial._id);
    this.getAllCustomer();
    this.getAllOrderDetail();
    this.getAllBook();
    this.loginBy = localStorage.getItem('loginBy');
    //set value giỏ hàng trên thanh head 
    this.getTotalCountAndPrice();
    // this.sortByDate();


  }
  script_Frontend() {
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');
    $('#future-orders').css('display', 'none');
    $('#done-orders').css('display', 'none');
    $('#order-cancel').css('display', 'none');

    $('#toggle-orders li').click(function () {
      $('#toggle-orders li').not(this).removeClass('selected');
      $(this).addClass('selected');
    });


    $('.fo').click(function () {
      
      $('#order-cancel').hide();
      $('#order-history').hide();
      $('#done-orders').hide();
      $('#future-orders').fadeIn('fast');
    });

    $('.oh').click(function () {
      $('#order-cancel').hide();
      $('#order-history').fadeIn('fast');
      $('#future-orders').hide();
      $('#done-orders').hide();
    });

    $('.com').click(function () {
      $('#order-cancel').hide();
      $('#order-history').hide();
      $('#future-orders').hide();
      $('#done-orders').fadeIn('fast');
    });
    $('.cancel').click(function () {
      $('#order-cancel').fadeIn('fast');
      $('#order-history').hide();
      $('#future-orders').hide();
      $('#done-orders').hide();
    });

    $(function () {
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });

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
  //#endregion
   formatCurrency(number){
    var n = number.split('').reverse().join("");
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");    
    return  n2.split('').reverse().join('') + 'VNĐ';
}
  // get order by userID
  IsCheckCancel=false
  IsCheckNew=false;
  IsCheckInprogress=false;
  IsCheckDone=false;
  
  getOrderByUserID(id) {
    this.list_Order_New=[]   //new
    this.list_Order_Inpro=[]  //inproject
    this.list_Order_Done=[]    //done
    this.list_Order_Cancel=[] //cancel
    this.IsCheckCancel=false
    this.IsCheckNew=false;
    this.IsCheckInprogress=false;
    this.IsCheckDone=false;
    this._order.getOrderByUserId(id).subscribe(
      listOrder => {
        this.list_Order = listOrder as Order[];
      
        for(let index in this.list_Order){
          if(this.list_Order[index].status=="New")
          {
           
            this.list_Order_New.push(this.list_Order[index])
            this.IsCheckNew=true;
            continue;
          }
          if(this.list_Order[index].status=='Inprogress'){
            this.IsCheckInprogress=true;
            this.list_Order_Inpro.push(this.list_Order[index])
            continue;
          }
          if(this.list_Order[index].status=='Done')
          {
            this.list_Order_Done.push(this.list_Order[index])
            this.IsCheckDone=true;
            continue;
          }
          if(this.list_Order[index].status=='Cancel')
          {
            this.list_Order_Cancel.push(this.list_Order[index])
            this.IsCheckCancel=true;
            continue;
          }
        
        }
  
      },
      error => console.log(error)
    );
  }

 
  getAllCustomer() {
    this._customer.getCustomerList().subscribe(
      allCustomerlist => {
        this.list_all_customer = allCustomerlist as Customer[];
      });
  }
  getAllOrderDetail(){
    this._orderDetail.getOrderDetailList().subscribe(
      allOrderDetailList => {
        this.list_OrderDetail = allOrderDetailList as OrderDetail[];
      });
  }
  getAllBook(){
    this._book.getBookList().subscribe(
      allBookList => {
        this.list_Book = allBookList as Book[]
      });
  }
  goToOrderHistory(){
    this._router.navigate(['/orderHistory'])
  }
  goToDiscountCode(){
    this._router.navigate(['/discountCode'])
  }
  clickGoToBookDetail(id)
  { 
    return this._router.navigate(["/bookDetail" + `/${id}`]);
  }
  ClickDeleteOrder(orderDel:Order){
    if(orderDel.discountCode!=0){
      var setconfirm = confirm('Hủy đơn hàng này bạn sẽ bị mất mã giảm giá '+orderDel.discountCode+"%, /n<br> Bạn có chắc là muốn xóa ? ")
      if(setconfirm){
        orderDel.status = "Cancel";
        this._order.putOrder(orderDel).subscribe(
          order => {
            
            this.ngOnInit();
    
          });
      }
    }else{
      var setconfirm = confirm('Bạn có chắc là muốn hủy đơn hàng này chứ ?');
      if(setconfirm){
        orderDel.status = "Cancel";
        this._order.putOrder(orderDel).subscribe(
          order => {
            
            this.ngOnInit();
    
          });
      }
    }
  }
  DeleteOrder(id:string){
    this._order.deleteOrder(id).subscribe(
      orderDel =>{
      }
    )
  }
  expandRow(index: number): void {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }
  moveToProfileDetail(){
    this._router.navigate(['/accountProfile'])
  }
  moveToProfileAccountSocial(){
    this._router.navigate(['/accountProfileSocial'])
  }
  goToFavorite(){
    this._router.navigate(['/favorites'])
  }

}


import { takeUntil } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';
import { payMomoService } from './../../../app-services/order-service/payMomo.service';

import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../app-services/order-service/order.service';
import { OrderDetailService } from '../../../app-services/orderDetail-service/orderDetail.service';
import { Order } from '../../../app-services/order-service/order.model';
import { OrderDetail } from '../../../app-services/orderDetail-service/orderDetail.model';
import { CustomerService } from '../../../app-services/customer-service/customer.service';
import { Customer } from '../../../app-services/customer-service/Customer.model';
import { SendMailService } from '../../../app-services/sendMail-service/sendMail.service';
import { SendMail } from '../../../app-services/sendMail-service/sendMail.model';
import { BookService } from '../../../app-services/book-service/book.service';

import { CartBookService } from 'src/app/app-services/cartBook-service/cartBook.service';
import { CartBook } from 'src/app/app-services/cartBook-service/cartBook.model';
import { Point } from 'src/app/app-services/point-service/point.model';
import { PointService } from 'src/app/app-services/point-service/point.service';
import { DiscountCodeService } from 'src/app/app-services/discountCode-Service/discountCode.service';
import { DiscountCode } from 'src/app/app-services/discountCode-Service/discountCode.model';
declare var $: any;
declare let paypal: any;
//dataset Recommend
import { datasetRecommend } from '../../../app-services/recommendSys-service/dataRecommend-service/dataRecommend.model'
import { DatasetRecommendService } from 'src/app/app-services/recommendSys-service/dataRecommend-service/dataRecommend.service';
import swal from 'sweetalert2'; 
import { AuthenticateService } from 'src/app/app-services/auth-service/authenticate.service';
//promotion
import { Promotion } from 'src/app/app-services/promotion-service/promotion.model';
import { PromotionService } from 'src/app/app-services/promotion-service/promotion.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-book-cart-payment',
  templateUrl: './book-cart-payment.component.html',
  styleUrls: ['./book-cart-payment.component.css']
})
export class BookCartPaymentComponent implements OnInit {
  constructor(private _router: Router, private route: ActivatedRoute, private authService: AuthenticateService, private _orderService: OrderService, private _payMomoService: payMomoService, private _sanitizer: DomSanitizer, private _orderDetailService: OrderDetailService,
    private _customerService: CustomerService, private _sendMail: SendMailService, private _bookService: BookService, private _cartBookDB: CartBookService
    , private _pointService: PointService, private _discountCode: DiscountCodeService, private _datasetRecommend: DatasetRecommendService, private _promotion: PromotionService) {

  }
  //chứa thông tin giỏ hàng
  CartBook = [];
  //chứa thông tin giỏ hàng dùng trong edit/update
  CartUpdate = [];
  sendMail: SendMail = new SendMail;
  orders: Order = new Order;
  orderDetails: OrderDetail = new OrderDetail;
  customer: Customer = new Customer;
  point: Point = new Point;
  TongTien = 0;
  TongCount = 0;
  //thông tin login
  accountSocial = JSON.parse(localStorage.getItem('accountSocial'));
  statusLogin = localStorage.getItem('statusLogin');
  lengthCartBook = 0;

  //alert
  alertMessage = "";
  alertSucess = false;
  alertFalse = false;

  isLoggedIn = false
  role: string = ''
  isCustomer = false

  //paypal
  cartBookDB: CartBook = new CartBook;
  public loading: boolean = true;
  discountCode: DiscountCode = new DiscountCode;
  paymentLoading = false;
  datasetRecommend: datasetRecommend = new datasetRecommend;
  ngOnInit() {

    
    this.get3Promotion()
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');

    this.authService.authInfo.subscribe(val => {
      this.isLoggedIn = val.isLoggedIn;
      this.role = val.role;
      this.isCustomer = this.authService.isCustomer()
      this.accountSocial = JSON.parse(this.authService.getAccount())

    });
    //paypal
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
    let customer_id = this.route.snapshot.paramMap.get("customer_id");
    this.getTotalCountAndPrice();
    this.getCustomerByID(customer_id);
    console.log(this.CartBook);
    this.paymentLoading = false;
    this.notifyPayMoMo();
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
  addPoint = 0;
  getTotalCountAndPrice() {
    this.TongTien = 0;
    this.TongCount = 0;
    this.addPoint = 0;
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
  //get customer By ID
  getCustomerByID(id) {
    this._customerService.getCustomerById(id).subscribe(
      getcustomer => {
        this.customer = getcustomer as Customer;
        console.log(this.customer);
        this.createJson(this.CartBook);
      },
      error => console.log(error)
    );
  }
  goToBookCart() {
    this._router.navigate(['/cartBook']);
  }
  goToShipping() {
    this._router.navigate(['/shipping']);
  }
  //   //Lưu order và orderDetail
  public now: Date = new Date();
  payCheckOut() {
    //lưu order
    //set time
    this.now = new Date();
    this.orders.orderDate = this.now.toUTCString();
    //set user
    this.orders.customerID = this.accountSocial._id;
    //set bill

    if (this.CartBook) {
      //SendMail
      this.sendMail.name = this.customer.name;
      this.sendMail.address = this.customer.address;
      this.sendMail.email = this.customer.email;
      this.sendMail.phone = this.customer.phone;
      this.sendMail.orderDate = this.orders.orderDate;
      this.sendMail.sale = "";
      this.sendMail.imgBook = "";
      this.sendMail.nameBook = "";
      this.sendMail.count = "";
      this.sendMail.price = "";
      this.sendMail.paymentOption = this.orders.paymentOption;

      //khai báo độ dài cartBook

      for (var i = 0; i < this.lengthCartBook; i++) {

        this.sendMail.count += this.CartBook[i].count + "next";
        if (this.IsPaypal) {
          this.sendMail.price += (this.CartBook[i].priceBook / 23632 * (100 - this.CartBook[i].sale) / 100).toFixed(2) + "next";
          this.sendMail.feeShip = parseFloat((this.customer.feeShip / 23632 * (100 - this.CartBook[i].sale) / 100).toFixed(2));
        } else {
          this.sendMail.price += this.CartBook[i].priceBook + "next";
          this.sendMail.feeShip = this.customer.feeShip;
        }
        this._bookService.getBookById(this.CartBook[i]._id).subscribe(
          getBook => {
            this.sendMail.imgBook += getBook['imgBook'] + "next";
            this.sendMail.nameBook += getBook['nameBook'] + "next";
            this.sendMail.sale += getBook['sale'] + "next";
            //nếu chạy tới cuốn sách cuối 
            if (this.CartBook[this.lengthCartBook - 1]._id == getBook['_id']) {
              //sendmail -->thực hiện lưu db (order - orderDetail - customer )
              this.sendMailCartBook(this.sendMail);
            }
          },
          error => console.log(error)
        );
      }

    }
  }

  // sendmail
  sendMailCartBook(sendMail: SendMail) {
    this.postOrder(this.orders);
    if (this.discountCode._id != null) {
      //update discount code
      // this.discountCode.status=1;
      // this.putDiscountCode(this.discountCode);
      //Delete Discount Code
      this._discountCode.deleteDiscountCode(this.discountCode._id).subscribe()
    }
    this.sendMail.discountCode = this.discountCode.discountCode;

    if (this.IsPaypal) {
      this.sendMail.totalPrice = this.TongTienPayPal.toString();
      this._sendMail.postsendMailPayPal(sendMail).subscribe(
        postSendMail => {

          console.log("SendMail Success");
          //show alert
          this.alertMessage = "Thanh toán thành công, mọi thông tin thanh toán đã được gửi qua email " + sendMail.email;
          this.alertSucess = true;
          setTimeout(() => { this.alertMessage = ""; this.alertSucess = false }, 4000);
          //thực hiện lưu db (order - orderDetail - customer )



        },
        error => console.log(error)
      );

    } else {
      this.sendMail.totalPrice = this.TongTien.toString();
      this._sendMail.postsendMail(sendMail).subscribe(
        postSendMail => {


          //thực hiện lưu db (order - orderDetail - customer )



        },
        error => console.log(error)
      );
    }
  }

  //post order
  postOrder(orders: Order) {
    orders.customerID = this.customer._id;
    this.now = new Date();
    orders.orderDate = this.now.toString().substring(0, 24);
    orders.totalPrice = this.TongTien;
    orders.discountCode = this.discountCode.discountCode;
    orders.feeShip = this.customer.feeShip;
    this._orderService.postOrder(orders).subscribe(
      orderdata => {
        console.log("Post Order")
        //lưu order detail
        for (var i = 0; i < this.lengthCartBook; i++) {

          this.orderDetails = new OrderDetail;
          this.orderDetails.bookID = this.CartBook[i]._id;
          this.orderDetails.count = this.CartBook[i].count;
          this.orderDetails.orderID = orderdata['_id'];
          this.orderDetails.price = this.CartBook[i].priceBook;
          this.orderDetails.sale = this.CartBook[i].sale;
          //post order Detail
          this.postOrderDetail(this.orderDetails);

        }
        if (orders.paymentOption == "Online") {
          this.point.point = parseInt((orders.totalPrice / 10000).toFixed(0));
          this.point.userID = this.accountSocial._id;

          this._pointService.putPointByUserID(this.point).subscribe(
            pointNew => {
            }
          );
        }

      },
      error => console.log(error)
    );
  }
  //post order Detail
  postOrderDetail(orderDetails: OrderDetail) {
    this.DataSetRecommend(orderDetails.bookID, orderDetails.count, 0, 0)
    this._orderDetailService.postOrderDetail(orderDetails).subscribe(
      orderDetaildata => {
        localStorage.removeItem('CartBook');
        localStorage.removeItem('DiscountCode');
        
        //delete allcartbookDB by userID
        this.deleteAllCartBookDBByUserID(this.accountSocial._id);
        this.getTotalCountAndPrice();
        this.IsPaypal = false;


        this._router.navigate(['/']);
      },
      error => console.log(error)
    );
  }

  //#region paypal
  //create a json for paypal
  JsonCartBook: any
  CartBook2 = []
  TongTienPayPal: any
  IsPaypal = false

  createJson(CartBook: any) {
    this.TongTienPayPal = 0;
    for (var i = 0; i < this.lengthCartBook; i++) {
      var infoCart = {
        name: CartBook[i].nameBook, price: parseFloat((CartBook[i].priceBook / 23632 * (100 - CartBook[i].sale) / 100).toFixed(2)),
        currency: "USD", quantity: CartBook[i].count, "tax": "0.02"
      };

      this.CartBook2.push(infoCart);
      this.TongTienPayPal += CartBook[i].count * parseFloat((CartBook[i].priceBook / 23632 * (100 - CartBook[i].sale) / 100).toFixed(2));
    }
    this.TongTienPayPal = this.TongTienPayPal.toFixed(2);

  }
  public didPaypalScriptLoad: boolean = false;
  public paymentAmount: number = 1000;
  totalcount = 150
  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AUDek_sBN-6s2gQcjZdAeJlrWP13WH4lH5x50YtX8H4fOK0jb9608CCgy--xsBtzoyF2Vapcrk1cVl42',
      production: 'xxxxxxxxxx'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions:
            [{
              "item_list": {
                "items": this.CartBook2
                , "shipping_address": {
                  "recipient_name": this.customer.name,
                  "line1": this.customer.address,
                  "line2": "",
                  "city": ".",
                  "phone": this.customer.phone,
                  "postal_code": ".",
                  "country_code": "VN"
                }
              },
              "amount": {
                "currency": "USD",
                "total": this.TongTienPayPal,
                "details": {
                  "subtotal": this.TongTienPayPal
                }
              },
              "description": "This is the payment description."
            }
            ]

          // [
          //   { amount: { total: this.paymentAmount, currency: 'USD' } }
          // ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      //xử lý thanh toán
      //thanh toán thành công

      return actions.payment.execute().then((payment) => {
        this.IsPaypal = true;
        this.orders.paymentOption = "Online";
        this.CheckBillBeforePay()
      });
    }
  };
  public loadPaypalScript(): Promise<any> {

    this.paymentLoading = true;
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })

  }
  //#endregion  
  deleteAllCartBookDBByUserID(id) {
    if (JSON.parse(localStorage.getItem('accountSocial')) != null) {

      this._cartBookDB.deleteAllCartBookByUserID(id).subscribe(
        req => {
          console.log(req);
        },
        error => console.log(error)
      );
    }
  }
  //update discount code
  putDiscountCode(discountCode: DiscountCode) {
    this._discountCode.putDiscountCode(discountCode).subscribe(
      req => {
        console.log(req);
      },
      error => console.log(error)
    );
  }
  DataSetRecommend(bookId, buy, rate, view) {
    if (this.accountSocial._id) {
      this.datasetRecommend.userID = this.accountSocial._id;
      this.datasetRecommend.bookID = bookId;
      //các value == 0 trừ click xem = 1  ...--> vào trong backend sẽ tự cộng
      this.datasetRecommend.buy = buy;
      this.datasetRecommend.rate = rate;
      this.datasetRecommend.click = view;
      console.log(this.datasetRecommend)
      this._datasetRecommend.putOrPostDatasetRecommend(this.datasetRecommend).subscribe(
        req => {
          console.log(req);
        },
        error => console.log(error)
      );
    }
  }

  payByMoMo() {
    this._bookService.UpdateQuantity(this.CartBook).subscribe(item => {
      if (item) {
        this.defineMoMo().then((data: any) => {
          this._payMomoService.postPayMoMo(data.order, data.orderDetails, data.sendMail).subscribe((MoMoReturn: any) => {
            if (MoMoReturn.resultCode == 0) {
              location.assign(MoMoReturn.payUrl)
            } else {
              swal.fire({
                title: "Lỗi thanh toán MoMo",
                text: "Vui Lòng thanh toán lại",
                icon: 'warning'
              }).then((willDelete) => {
                this._router.navigate([`/payment/${this.customer._id}`])
              })
            }
          })
        })
      } else {
        swal.fire({
          title: "Đơn Hàng Bạn Đặt Mua Hiện Đã Hết Hàng!",
          text: "Vui Lòng Quay Lại Sau ",
          icon: 'warning'
        }).then((willDelete) => {
          this.ngOnInit();
        })
      }
    })
  }
  defineMoMo() {
    return new Promise((resolve, rejects) => {

      this.orders.paymentOption = "MoMo";
      this.orders.customerID = this.accountSocial._id;
      this.now = new Date();
      this.orders.orderDate = this.now.toString().substring(0, 24);
      this.orders.totalPrice = this.TongTien;
      this.orders.discountCode = this.discountCode.discountCode;
      this.orders.feeShip = this.customer.feeShip;
      this.orders.status = "New"

      var ArrayOrder: OrderDetail[] = []
      for (var i = 0; i < this.lengthCartBook; i++) {
        var orderDetail = new OrderDetail;
        orderDetail.bookID = this.CartBook[i]._id;
        orderDetail.count = this.CartBook[i].count;
        orderDetail.orderID = '';
        orderDetail.price = this.CartBook[i].priceBook;
        orderDetail.sale = this.CartBook[i].sale;
        //post order Detail
        ArrayOrder.push(orderDetail)
      }

      this.sendMail.name = this.customer.name;
      this.sendMail.address = this.customer.address;
      this.sendMail.email = this.customer.email;
      this.sendMail.phone = this.customer.phone;
      this.sendMail.orderDate = this.orders.orderDate;
      this.sendMail.sale = "";
      this.sendMail.imgBook = "";
      this.sendMail.nameBook = "";
      this.sendMail.count = "";
      this.sendMail.price = "";
      this.sendMail.paymentOption = this.orders.paymentOption;
      for (var i = 0; i < this.lengthCartBook; i++) {
        
        this.sendMail.count += this.CartBook[i].count + "next";
        this.sendMail.price += this.CartBook[i].priceBook + "next";
        this.sendMail.feeShip = this.customer.feeShip;
        this._bookService.getBookById(this.CartBook[i]._id).subscribe(
          getBook => {
            this.sendMail.imgBook += getBook['imgBook'] + "next";
            this.sendMail.nameBook += getBook['nameBook'] + "next";
            this.sendMail.sale += getBook['sale'] + "next";
            if (this.CartBook[this.lengthCartBook - 1]._id == getBook['_id']) {
              resolve({ order: this.orders, orderDetails: ArrayOrder, sendMail: this.sendMail })
            }
          },
          error => rejects(error)
        );
      }

    })
  }
  notifyPayMoMo() {
    var queryParams = this.route.snapshot.queryParamMap['params']
    if (queryParams.hasOwnProperty("resultCode")) {
      if (queryParams.resultCode == '0') {
        localStorage.removeItem('CartBook');
        localStorage.removeItem('DiscountCode');
        this.getTotalCountAndPrice();
        this.IsPaypal = false;
        swal.fire({
          title: "Đã Thanh Toán Thành Công Đơn Hàng!",
          text: "Cám Ơn Bạn Đã Ủng Hộ Cửa Hàng",
          icon: 'success'
        }).then((willDelete) => {
          this.alertMessage = "Đã Thanh Toán Thành Công Đơn Hàng! ";
          this.alertSucess = true;

          this._router.navigate(["/homePage"])
        });
      } else {
        swal.fire({
          title: "thanh toán thất bại",
          text: "vui lòng thanh toán lại",
          icon: 'warning'
        }).then((willDelete) => {
          this._router.navigate([`/payment/${this.customer._id}`])
        })
      }
    }
  }
  payByCash() {
    this.paymentLoading = true;
    this.orders.paymentOption = "Cash";
    //kiểm tra số lượng sách trong cửa hàng so với đơn hàng 
    this.CheckBillBeforePay()


  }
  //Kiểm tra bất đồng bộ và roll back
  listBookCheck: any
  CheckBillBeforePay() {
    this._bookService.UpdateQuantity(this.CartBook).subscribe(res => {
      if (res == true) {
        this.payCheckOut();
        if (this.orders.paymentOption == "Cash") {
          swal.fire({
            title: "Đã Đặt Thành Công Đơn Hàng!",
            text: "Cám Ơn Bạn Đã Ủng Hộ Cửa Hàng",
            icon: 'success'
          }).then((willDelete) => {
            this.ngOnInit();
          });
        }
        if (this.orders.paymentOption == "Online") {

          swal.fire({
            title: "Đã Thanh Toán Thành Công Đơn Hàng!",
            text: "Cám Ơn Bạn Đã Ủng Hộ Cửa Hàng",
            icon: 'success'
          }).then((willDelete) => {
            this._router.navigate(["/homePage"])
          });
        }
        if (this.orders.paymentOption == "Momo") {

          swal.fire({
            title: "Đã Thanh Toán Thành Công Đơn Hàng!",
            text: "Cám Ơn Bạn Đã Ủng Hộ Cửa Hàng",
            icon: 'success'
          }).then((willDelete) => {
            this._router.navigate(["/homePage"])
          });
        }
      } else {
        swal.fire({
          title: "Đơn Hàng Bạn Đặt Mua Hiện Đã Hết Hàng!",
          text: "Vui Lòng Quay Lại Sau ",
          icon: 'warning'
        }).then((willDelete) => {
          this.ngOnInit();
        })

      }
    })
  }



  //promotion
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
      var index = 0;
      for (var item of this.ListPromotion) {
        if (this.ListPromotion.length == 1) {  //voi1 1 1phan tu
          if (this.TongTien < this.ListPromotion[index].ifDiscount) {
            this.promotionDiscount[0] = 0;  //% giảm giá
          }
          else {
            this.promotionDiscount[0] = this.ListPromotion[index].discount;  //% giảm giá
          }
          break;
        }
        //dung dau mang
        if (index == 0 && this.TongTien < this.ListPromotion[index].ifDiscount) {
          this.promotionDiscount[0] = 0;  //% giảm giá
          break;
        }
        //phan giua
        if (index != 0 && this.TongTien >= this.ListPromotion[index - 1].ifDiscount && this.TongTien < this.ListPromotion[index].ifDiscount) {
          this.promotionDiscount[0] = this.ListPromotion[index - 1].discount;  //% giảm giá
          break;
        }
        //phan cuoi
        if (index != 0 && index == this.ListPromotion.length - 1 && this.TongTien > this.ListPromotion[index].ifDiscount) {
          this.promotionDiscount[0] = this.ListPromotion[index].discount;  //% giảm giá
          break;
        }
        index++;
      }
    } else {
      this.promotionDiscount[0] = 0;  //% giảm giá
    }
    if (localStorage.getItem('DiscountCode') != null) {
      this.discountCode = JSON.parse(localStorage.getItem('DiscountCode'));
      this.discountCode.discountCode = this.discountCode.discountCode + this.promotionDiscount[0];

    } else {
      this.discountCode.discountCode = 0 + this.promotionDiscount[0];
    }
  }

}
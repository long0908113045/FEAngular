import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthenticateService } from 'src/app/app-services/auth-service/authenticate.service';
declare var $:any;     
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  showFiller = false;
  isLoggedIn = false
  role: string = ''
  accountSocial: any
  constructor(private _router: Router,private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.authInfo.subscribe(val => {
			this.isLoggedIn = val.isLoggedIn;
			this.role = val.role;
      this.accountSocial = JSON.parse(this.authService.getAccount())
      if(val.role.includes("CUSTOMER")){
        this._router.navigate(['/404Notfound'])
      }
		  });
      $(".nav-item").click(function() { 
        var navItem = $(this);
        $("li").removeClass("active");
        navItem.addClass("active");
      });
 

    $("#img1").click(function() { 
      var imageUrl = $(this).find("img").attr('src');
      $(".sidebar").css("background", "linear-gradient(rgba(192,192,192,0.3), rgba(171, 161, 247, 1)),url(" + imageUrl + ")");
  }); 
  $("#img2").click(function() { 
    var imageUrl = $(this).find("img").attr('src');
    $(".sidebar").css("background", "linear-gradient(rgba(192,192,192,0.3), rgba(171, 161, 247, 1)),url(" + imageUrl + ")");
  }); 
  $("#img3").click(function() { 
    var imageUrl = $(this).find("img").attr('src');
    $(".sidebar").css("background", "linear-gradient(rgba(192,192,192,0.3), rgba(171, 161, 247, 1)),url(" + imageUrl + ")");
  }); 
  $("#img4").click(function() { 
    var imageUrl = $(this).find("img").attr('src');
    $(".sidebar").css("background", "linear-gradient(rgba(192,192,192,0.3), rgba(171, 161, 247, 1)),url(" + imageUrl + ")");
  }); 

    $(document).ready(function() {
      $().ready(function() {
        var $sidebar = $('.sidebar');

        var $sidebar_img_container = $sidebar.find('.sidebar-background');

        var $full_page = $('.full-page');

        var $sidebar_responsive = $('body > .navbar-collapse');

        var window_width = $(window).width();

        var fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

        if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
          if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
            $('.fixed-plugin .dropdown').addClass('open');
          }

        }

        $('.fixed-plugin a').click(function(event) {
          // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
              event.stopPropagation();
            } else if (window.event) {
              window.event.cancelBubble = true;
            }
          }
        });
        var $full_page_background: any
        $('.fixed-plugin .active-color span').click(function() {
           $full_page_background = $('.full-page-background');

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
          }

          if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
          }
        });

        $('.fixed-plugin .background-color .badge').click(function() {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('background-color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-background-color', new_color);
          }
        });

        $('.fixed-plugin .img-holder').click(function() {
           $full_page_background = $('.full-page-background');

          $(this).parent('li').siblings().removeClass('active');
          $(this).parent('li').addClass('active');


          var new_image = $(this).find("img").attr('src');

          if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
              $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
              $sidebar_img_container.fadeIn('fast');
            });
          }

          if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
              $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
              $full_page_background.fadeIn('fast');
            });
          }

          if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
          }
        });

        $('.switch-sidebar-image input').change(function() {
           $full_page_background = $('.full-page-background');

         var $input = $(this);
          var background_image = false;
          if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
              $sidebar_img_container.fadeIn('fast');
              $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
              $full_page_background.fadeIn('fast');
              $full_page.attr('data-image', '#');
            }

             background_image = true;
          } else {
            if ($sidebar_img_container.length != 0) {
              $sidebar.removeAttr('data-image');
              $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
              $full_page.removeAttr('data-image', '#');
              $full_page_background.fadeOut('fast');
            }

            background_image = false;
          }
        });
      });
    });
  }
  moveToUserDetail(userId){
    return this._router.navigate(["/userDetail" + `/${userId}`]);
  }
 
  moveToDashboard(){
    this._router.navigate(['/dashboard']);
  }
    moveToMap(){
    this._router.navigate(['/maps']);
  }
  
  moveToManagePage(){
    this._router.navigate(['/managePage']);
  }
  moveToManageBook(){
    this._router.navigate(['/manageBook']);
  }

  moveToManageAuthor(){
    this._router.navigate(['/manageAuthor']);
  }

  moveToManageCategory(){
    this._router.navigate(['/manageCategory']);
  }

  moveToManageSeri(){
    this._router.navigate(['/manageSeri']);
  }

  moveToManageEvent(){
    this._router.navigate(['/manageEvent']);
  }

  moveToManageOrder(){
    this._router.navigate(['/manageOrder']);
  }

  moveToManageUser(){
    this._router.navigate(['/manageUser']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  
  constructor(private router:Router,private route: ActivatedRoute) { }
  idBook = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    $('.searchHeader').attr('style', 'font-size: 1.6rem !important');
      $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });
    
      return this.router.navigate(["/booksCategory" + `/${this.idBook}`]);
  }

}

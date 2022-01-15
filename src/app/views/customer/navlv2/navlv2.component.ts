import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-navlv2',
  templateUrl: './navlv2.component.html',
  styleUrls: ['./navlv2.component.css']
})
export class Navlv2Component implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute) { }
  id = this.route.snapshot.paramMap.get('id');
  namefilter = this.route.snapshot.paramMap.get('name');
  ngOnInit() {
      return this.router.navigate(["/filter/" +`/${this.namefilter}`+"/"+ `/${this.id}`]);
  }

}

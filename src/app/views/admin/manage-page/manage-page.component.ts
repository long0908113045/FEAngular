import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  moveToManageUser(){
    this._router.navigate(['/manageUser']);
  }
  moveToManageBook(){
    this._router.navigate(['/manageBook']);
  }
  moveToManageOrder(){
    this._router.navigate(['/manageOrder']);
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
  moveToManageWheel(){
    this._router.navigate(['/manageWheel']);
  }
}

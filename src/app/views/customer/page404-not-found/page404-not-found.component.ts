import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404-not-found',
  templateUrl: './page404-not-found.component.html',
  styleUrls: ['./page404-not-found.component.css']
})
export class Page404NotFoundComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  goHomePage(){
    this._router.navigate(['/homePage'])
  }
}

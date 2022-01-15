import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  category: Category;
  categories: Category[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/categories';
  getCategoryList() {
    return this._http.get(this.baseURL);
  }
  putCategory(category: Category) {
    return this._http.put(this.baseURL + `/${category._id}`,category);
  }
  getCategoryById(_id: String) {
    return this._http.get(this.baseURL  + `/${_id}`);
  }
  postCategory(category: Category) {
    return this._http.post(this.baseURL, category);
  }
  deleteCategory(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
}

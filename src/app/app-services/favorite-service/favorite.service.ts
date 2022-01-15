import { Injectable } from '@angular/core';
import { Favorite } from './favorite.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorite: Favorite;
  categories: Favorite[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/favorites';
  getFavoriteList() {
    return this._http.get(this.baseURL);
  }
  putFavorite(favorite: Favorite) {
    return this._http.put(this.baseURL + `/${favorite._id}`,favorite);
  }
  getFavoriteById(_id: String) {
    return this._http.get(this.baseURL  + `/${_id}`);
  }
  postFavorite(favorite: Favorite) {
    return this._http.post(this.baseURL, favorite);
  }
  getAllFavoriteByUserID(id: String) {
    return this._http.get(this.baseURL+"/getAllByUserID" + `/${id}`);
  }
  getAllBookFavoriteByUserID(id: String) {
    return this._http.get(this.baseURL+"/getAllBookByUserID" + `/${id}`);
  }
}

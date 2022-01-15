import { Injectable } from '@angular/core';
import { Author } from './author.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  author: Author
  authors: Author[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+'/authors';
  getAuthorList() {
    return this._http.get(this.baseURL);
  }

  putAuthor(author: Author) {
    return this._http.put(this.baseURL + `/${author._id}`,author);
  }
  getAuthorById(_id: String) {
    return this._http.get(this.baseURL + "/" + _id);
  }
  postAuthor(author: Author) {
    return this._http.post(this.baseURL, author);
  }
  deleteAuthor(_id: string) {
    return this._http.delete(this.baseURL + `/${_id}`);
  }
}

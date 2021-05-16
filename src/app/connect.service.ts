import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private url: string = '';
  constructor(private http: HttpClient) {
    this.url = environment.productjson;
  }

  getProductData() {
    return this.http.get(this.url);
  }
}

import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/productos`;
  public httOpt = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain'
    })
  }

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  updateProduct(product : Product){
    return this.http.put(`${this.apiUrl}/${product.id}`, JSON.stringify(product), this.httOpt);
  }

  addProduct(product : Product){
    return this.http.post(`${this.apiUrl}`, JSON.stringify(product), this.httOpt);
  }

  deleteProduct(id : number){
      return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

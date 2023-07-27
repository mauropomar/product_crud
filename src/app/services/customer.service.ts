import { Customer } from './../models/customer.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://127.0.0.1:3000/usuarios';
  public httOpt = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain'
    })
  }

  constructor(private http : HttpClient) { }

  getCustomers(){
    return this.http.get<Customer[]>(`${this.apiUrl}`);
  }

  updateCustomer(customer : Customer){
    return this.http.put(`${this.apiUrl}/${customer.id}`, JSON.stringify(customer), this.httOpt);
  }

  addCustomer(customer : Customer){
    return this.http.post(`${this.apiUrl}`, JSON.stringify(customer), this.httOpt);
  }

  deleteCustomer(id : number){
      return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

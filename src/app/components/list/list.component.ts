import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { Product } from './../../models/product.model';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[];
  display: string = 'none';
  isEditModeEnabled: boolean = false;
  prod: Product = {};

  constructor(
    private store: Store<fromStore.AppState>
  ) {
    store.select(fromStore.getProducts).subscribe((rs) => {
      this.products = rs;
    });
    store.select(fromStore.getProductById(2)).subscribe((rs) => {
      console.log(rs);
    });
  }

  ngOnInit(): void {
      this.store.dispatch(new fromStore.LoadProduct());
  }

  openDialogModal(){
    this.isEditModeEnabled = false;
    this.display = 'block';
  }

  closeModal(myForm:NgForm){
    myForm.reset();
    this.display = 'none';
  }

  editProduct(product: Product){
    this.isEditModeEnabled = true;
    this.prod = {...product};
    this.display = 'block';
  }

  updateProduct(myForm: NgForm){
      this.store.dispatch(new fromStore.UpdateProduct(myForm.value));
      this.closeModal(myForm);
  }

  deleteProduct(productId: number){
    if(productId !== undefined){
      if(confirm('¿Estas seguro de borrar a este producto?')){
          this.store.dispatch(new fromStore.DeleteProduct(productId));
      }
  }
  }

  addProduct(myForm: NgForm){
    let userId = new Date().getTime();
    let newProduct = myForm.value;
    newProduct.id = userId;
    if(newProduct.name !==null && newProduct !== undefined){
      this.store.dispatch(new fromStore.AddProduct(newProduct));
      this.closeModal(myForm);
    }
  }
}

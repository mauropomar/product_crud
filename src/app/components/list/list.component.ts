import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder,  Validators } from "@angular/forms";
import * as fromStore from './../../store';
import { Product } from './../../models/product.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[];
  submitted = false;
  display: string = 'none';
  isEditModeEnabled: boolean = false;
  prod: Product = {};

  constructor(
    private store: Store<fromStore.AppState>, public fb: FormBuilder
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

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(20), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
    serial_number: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
    price: [0, [Validators.required, Validators.min(100), Validators.max(500)]]
  })

  get myForm() {
    return this.productForm.controls;
  }

  openDialogModal() {
    this.isEditModeEnabled = false;
    this.display = 'block';
  }

  closeModal(myForm: NgForm) {
    myForm.reset();
    this.display = 'none';
    this.submitted = false;
  }

  editProduct(product: Product) {
    this.isEditModeEnabled = true;
    this.prod = { ...product };
    this.myForm.name.setValue(product.name);
    this.myForm.serial_number.setValue(product.serial_number);
    this.myForm.price.setValue(product.price);
    this.display = 'block';
  }

  updateProduct(myForm: NgForm) {
    this.submitted = true;
    if(!this.productForm.valid) {
      alert('Please fill all the required fields to update a product!')
      return false;
    }
    myForm.value.id = this.prod.id;
    this.store.dispatch(new fromStore.UpdateProduct(myForm.value));
    this.closeModal(myForm);
  }

  deleteProduct(productId: number) {
    if (productId !== undefined) {
      if (confirm('¿Estas seguro de borrar a este producto?')) {
        this.store.dispatch(new fromStore.DeleteProduct(productId));
      }
    }
  }

  addProduct(myForm: NgForm) {
    this.submitted = true;
    if(!this.productForm.valid) {
      alert('Please fill all the required fields to create a product!')
      return false;
    }
    let userId = new Date().getTime();
    let newProduct = myForm.value;
    newProduct.id = userId;
    if (newProduct.name !== null && newProduct !== undefined) {
      this.store.dispatch(new fromStore.AddProduct(newProduct));
      this.closeModal(myForm);
    }
  }
}

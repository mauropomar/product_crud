import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';
import * as fromStore from './../../store';
import { Product } from './../../models/product.model';


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
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9 ]{2,20}$')]],
    serial_number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), , Validators.pattern('^[a-zA-Z0-9 ]{2,20}$')]],
    price: [0, [Validators.required, Validators.min(100), Validators.max(500)]]
  })

  get myForm() {
    return this.productForm.controls;
  }

  formatInput() {
    const value = this.myForm.price.value;
    if (value !== null) {
      const value = this.myForm.price.value;
      this.myForm.price.setValue(value.toFixed(2));
    }
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
    if (!this.productForm.valid) {
      return false;
    }
    const productExist = this.products.filter(
      p => p.name.toLowerCase() === myForm.value.name.toLowerCase() && p.id !== this.prod.id
    );
    if (productExist.length > 0) {
      alert('There is already a product with this name');
      return;
    };
    myForm.value.id = this.prod.id;
    this.store.dispatch(new fromStore.UpdateProduct(myForm.value));
    this.closeModal(myForm);
  }

  deleteProduct(productId: number) {
    if (productId !== undefined) {
      if (confirm('¿Are you sure you want to delete this product?')) {
        this.store.dispatch(new fromStore.DeleteProduct(productId));
      }
    }
  }

  addProduct(myForm: NgForm) {
    this.submitted = true;
    if (!this.productForm.valid) {
      return false;
    }
    const productExist = this.products.filter(p => p.name.toLowerCase() === myForm.value.name.toLowerCase());
    if (productExist.length > 0) {
      alert('There is already a product with this name');
      return;
    };
    let userId = new Date().getTime();
    let newProduct = myForm.value;
    newProduct.id = userId;
    if (newProduct.name !== null && newProduct !== undefined) {
      this.store.dispatch(new fromStore.AddProduct(newProduct));
      this.closeModal(myForm);
    }
  }
}

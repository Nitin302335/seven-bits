import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../layouts/auth-layout/service/auth.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  isSubmitted = false;
  isProductAdded = false;
  isSignupFailed = false;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      productId: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  get formControls() {
    return this.addProductForm.controls;
  }

  addProduct() {
    this.isSubmitted = true;
    this.isProductAdded = false;
    console.log(`This`, this.addProductForm.value);

    if (this.addProductForm.invalid) {
      return;
    }
    this.productService.createProduct(this.addProductForm.value).subscribe(response => {
      console.log('response : ', response);
      this.productAddSuccess();
    }, (error) => {
      console.log(`Error`, error, error?.error?.error);
      this.productAddFailed(error);
    });
  }

  productAddSuccess() {
    this.isProductAdded = true;
    this.isSubmitted = false;
    this.errorMessage = undefined;
    this.addProductForm.reset();
  }

  productAddFailed(error) {
    this.isProductAdded = false;
    this.errorMessage = error?.error?.error || 'Something went wrong';
  }



}

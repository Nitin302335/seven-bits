import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  paginationPayload = {
    page: 1,
    pageSize: 5,
    sorting: {
      column: "creationDate",
      direction: "desc"
    }
  }
  totalPage: number;
  pages: number[];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts(this.paginationPayload);
  }

  EditProduct() {
  }

  removeProduct(product) {
    this.productService.deleteProduct(product._id).subscribe(response => {
      console.log(`response : `, response);
      this.getProducts(this.paginationPayload);
    }, (error) => {
      console.log("error: ", error);
    });
  }

  changePage(page) {
    this.paginationPayload.page = page;
    this.getProducts(this.paginationPayload);
  }

  getProducts(paginationPayload?) {
    this.productService.getProducts(paginationPayload).subscribe(response => {
      console.log(`response : `, response);
      this.products = response?.data?.items || this.products;
      this.totalPage = Math.ceil(response?.data?.total / this.paginationPayload.pageSize);
      console.log(`this.totalPage :`, this.totalPage)
      this.pages = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      console.log(`this.pages: `, this.pages);
    }, (error) => {
      console.log("error: ", error);
    });
  }

  addProduct(){
    this.router.navigate(['/','add-product']);
  }

}

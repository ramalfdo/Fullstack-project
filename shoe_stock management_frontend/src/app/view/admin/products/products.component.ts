import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../http-service/server.service";
import {MatDialog} from "@angular/material/dialog";
import {AddToCartComponent} from "../../client/add-to-cart/add-to-cart.component";
import {CreateProductComponent} from "../create-product/create-product.component";
import {UpdateProductComponent} from "../update-product/update-product.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:any = []
  constructor(private service:ServerService,public dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts('').subscribe((value:any) => {
      this.products = value.data
    } )
  }

  update( data: any) {
    const dialogRef = this.dialog.open(UpdateProductComponent,{data});
    dialogRef.afterClosed().subscribe(value => {
      if(value && value.isLoad) {
        this.loadProducts();
      }
    })
  }

  remove(id: any) {
    var result = confirm("Are you sure?");

    if(result.valueOf()) {

      this.service.deleteProduct(id).subscribe(value => {
        this.toastr.success(`Product Successfully Deleted`, 'Delete',{
          closeButton: true,
          progressBar: true
        })
        this.loadProducts();
      })
    }
  }

  create() {
    const dialogRef = this.dialog.open(CreateProductComponent);
    dialogRef.afterClosed().subscribe(value => {
      if(value && value.isLoad) {
        this.loadProducts();
      }
    })
  }
}

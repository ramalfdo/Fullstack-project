import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../http-service/server.service";
import {MatDialog} from "@angular/material/dialog";
import {AddToCartComponent} from "../add-to-cart/add-to-cart.component";

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.scss']
})
export class ClientProductsComponent implements OnInit {

  products :any = [];
  constructor(private service: ServerService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts() {
    this.service.getProducts('in stock').subscribe((value:any) => {
      this.products = value.data
    })
  }

  addToCart( product : any) {
    const dialogRef = this.dialog.open(AddToCartComponent, {
      data: product,
    });

  }
}

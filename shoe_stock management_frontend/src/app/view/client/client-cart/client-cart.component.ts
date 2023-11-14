import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddToCartComponent} from "../add-to-cart/add-to-cart.component";
import {ClientPurchaseComponent} from "../client-purchase/client-purchase.component";

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.scss']
})
export class ClientCartComponent implements OnInit {

  cart:any = []
  totalAmount = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const cart = localStorage.getItem("cart");
    if(cart) {
      this.cart = JSON.parse(cart);
      this.calculateTotal()
    }

  }

  calculateTotal() {
   this.totalAmount= this.cart.reduce(function (total:any, data:any) {
      return total + data.amount;
    }, 0);
  }

  removeCart( id : any) {
    this.cart.splice(this.cart.findIndex((item:any) => item.item === id), 1)
    this.calculateTotal()
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }
  purchase() {
    const dialogRef = this.dialog.open(ClientPurchaseComponent, {
      data: {
        cart:this.cart,
        total:this.totalAmount
      },
    });
  }
}

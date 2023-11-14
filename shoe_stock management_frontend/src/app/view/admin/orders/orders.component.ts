import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../http-service/server.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:any = [];
  constructor(private service: ServerService) { }

  ngOnInit(): void {
    this.loadOrders()
  }
  loadOrders() {

    this.service.getOrders('').subscribe((value:any) => {
      this.orders = value.data

    })

  }
  getQty(product:any, orders:any) {
    return orders.find((p:any) => p.product === product).qty

  }
}

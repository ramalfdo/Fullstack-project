import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../http-service/server.service";

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  orders:any = [];
  constructor(private service: ServerService) { }

  ngOnInit(): void {
    this.loadOrders()
  }


  loadOrders() {

    this.service.getOrders(localStorage.getItem('user')).subscribe((value:any) => {
      this.orders = value.data
    })

  }

  getQty(product:any, orders:any) {
    return orders.find((p:any) => p.product === product).qty

  }
}

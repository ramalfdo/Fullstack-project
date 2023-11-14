import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ServerService} from "../../../http-service/server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-purchase',
  templateUrl: './client-purchase.component.html',
  styleUrls: ['./client-purchase.component.scss']
})
export class ClientPurchaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClientPurchaseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private service: ServerService,
              private route: Router) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }

  purchase() {

   const items =  this.data.cart.map((d:any) => {
      return {
        item:d.item,
        qty:d.qty
      }
    })

    const payload = {
     user: localStorage.getItem('user'),
      items
    }

    this.service.createOrder(payload).subscribe(value => {
      this.toastr.success('Your order has been successfully placed', 'Order Places',{
        closeButton: true,
        progressBar: true
      })
      this.closeDialog()
      this.route.navigate(['client/products'])
      localStorage.removeItem('cart')


    },error => {
      this.toastr.error(error.error, 'Error',{
        closeButton: true,
        progressBar: true
      })
    })
  }
}

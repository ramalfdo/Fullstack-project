import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  qty:number = 0
  constructor(public dialogRef: MatDialogRef<AddToCartComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService) { }

  ngOnInit(): void {

  }
  closeDialog() {
    this.dialogRef.close();
  }

  addToCart() {
    const cart = localStorage.getItem("cart");

    if(!cart) {

      if(this.qty > this.data.qty) {
        this.toastr.error('Please add valid quantity', 'Invalid Quantity',{
          closeButton: true,
          progressBar: true
        })
        return
      }
      const newCart:any = [
          {
            item: this.data._id,
            name: this.data.name,
            qty: this.qty,
            unitPrice: this.data.price,
            amount: this.data.price * this.qty
          }
      ]

      localStorage.setItem("cart", JSON.stringify(newCart));

    }else {
      const userCart = JSON.parse(cart)

      const product = userCart.find((item:any) => item.item === this.data._id)


      if(product) {
        const qty = product.qty + this.qty
        if(qty> this.data.qty) {
          this.toastr.error('Please add valid quantity', 'Invalid Quantity',{
            closeButton: true,
            progressBar: true
          })
          return
        }

        product.qty = qty
        product.amount = this.data.price * qty
        localStorage.setItem("cart", JSON.stringify(userCart));
      }else {

        if(this.qty > this.data.qty) {
          this.toastr.error('Please add valid quantity', 'Invalid Quantity',{
            closeButton: true,
            progressBar: true
          })
          return
        }

        userCart.push(    {
          item: this.data._id,
          name: this.data.name,
          qty: this.qty,
          unitPrice: this.data.price,
          amount: this.data.price * this.qty
        })

        localStorage.setItem("cart", JSON.stringify(userCart));
      }


    }
    this.toastr.success(`${this.data.name} add to cart`, 'Added to cart',{
      closeButton: true,
      progressBar: true
    })
    this.dialogRef.close();
  }
}

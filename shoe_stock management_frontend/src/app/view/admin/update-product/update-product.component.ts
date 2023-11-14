import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ServerService} from "../../../http-service/server.service";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  public updateProduct:FormGroup;
  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<UpdateProductComponent>,
              private toastr: ToastrService, private service: ServerService,   @Inject(MAT_DIALOG_DATA) public data: any) {
    this.updateProduct = this.formBuilder.group({
      name: '',
      description:'',
      qty:0,
      price:0
    });
  }

  ngOnInit(): void {
    this.updateProduct = this.formBuilder.group({
      name: this.data.name,
      description: this.data.description,
      qty:this.data.qty,
      price:this.data.price
    });
  }
  createProduct(){
    this.service.updateProduct(this.data._id,this.updateProduct.value).subscribe(value => {
      this.toastr.success(`Product Successfully Updated`, 'Updated',{
        closeButton: true,
        progressBar: true
      })
    })
    this.dialogRef.close({isLoad: true})
  }
  closeDialog() {
    this.dialogRef.close();
  }
}

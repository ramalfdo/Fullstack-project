import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ServerService} from "../../../http-service/server.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public createProductForm:FormGroup;
  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<CreateProductComponent>,
              private toastr: ToastrService, private service: ServerService) {
    this.createProductForm = this.formBuilder.group({
      name: '',
      description:'',
      qty:0,
      price:0
    });
  }

  ngOnInit(): void {
  }
  createProduct(){
    this.service.createProduct(this.createProductForm.value).subscribe(value => {
      this.toastr.success(`Product Successfully Created`, 'Created',{
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

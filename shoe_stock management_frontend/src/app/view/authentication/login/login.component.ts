import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ServerService} from "../../../http-service/server.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private service: ServerService,private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      user_name: '',
      password:''
    });
  }

  ngOnInit(): void {
  }

  logIn(){
    this.service.login(this.loginForm.value).subscribe((value:any) => {

      localStorage.setItem("user",value.data.id)

      if(value.data.role === 'client') {
          this.router.navigate(['client/products'])
      }else {
        this.router.navigate(['admin/products'])
      }

    },error => {
      this.toastr.error('Please check your credentials', 'Login Failed',{
        closeButton: true,
        progressBar: true
      })
    })
  }
}

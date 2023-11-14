import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServerService} from "../../../http-service/server.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private service: ServerService,
              private router: Router,private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      name: '',
      address:'',
      mobile:'',
      user_name:'',
      password:''
    });
  }

  ngOnInit(): void {
  }

  createAccount() {



    this.service.createClient(this.registerForm.value).subscribe(value => {
      this.toastr.success('Please login to continue', 'Your account is created',{
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['authentication/login'])
    },error => {
      this.toastr.error('Unexpected error', 'Opps',{
        closeButton: true,
        progressBar: true
      });
    })


  }
}

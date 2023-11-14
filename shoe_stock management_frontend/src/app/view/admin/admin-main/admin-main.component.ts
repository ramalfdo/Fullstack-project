import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../../http-service/socket.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  constructor(private socketService: SocketService,private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {

    this.socketService.listenOrderPlaced().subscribe(value => {

      this.toastr.info(`A new order has been placed`, 'New Order !!',{
        closeButton: true,
        progressBar: true,
        timeOut:15000
      })

    })
  }

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['authentication/login'])
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url = environment.url
  constructor(private  http: HttpClient) { }

  createClient( client : any ) {
    return this.http.post(`${this.url}/api/clients/register`, client)
  }
  login( payload : any ) {
    return this.http.post(`${this.url}/api/clients/login`, payload)
  }

  getProducts(status:any) {
    return this.http.get(`${this.url}/api/products?status=${status}`)
  }

  createOrder(payload:any) {
    return this.http.post(`${this.url}/api/orders`,payload)
  }

  getOrders(client:any) {
    return this.http.get(`${this.url}/api/orders`,{params:{client}})
  }

  createProduct(payload:any) {
    return this.http.post(`${this.url}/api/products`,payload)
  }
  updateProduct(id:any,payload:any) {
    return this.http.put(`${this.url}/api/products/${id}`,payload)
  }
  deleteProduct(id:any) {
    return this.http.delete(`${this.url}/api/products/${id}`)
  }
}

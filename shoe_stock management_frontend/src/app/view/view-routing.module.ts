import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ClientHomeComponent} from "./client/client-home/client-home.component";
import {ClientProductsComponent} from "./client/client-products/client-products.component";
import {ClientCartComponent} from "./client/client-cart/client-cart.component";
import {ClientOrdersComponent} from "./client/client-orders/client-orders.component";
import {ProductsComponent} from "./admin/products/products.component";
import {AdminMainComponent} from "./admin/admin-main/admin-main.component";
import {OrdersComponent} from "./admin/orders/orders.component";
import {AuthenticationGuard} from "../guard/authentication.guard";

const routes: Routes = [
  {
    path: '', redirectTo: 'authentication/login', pathMatch:'full'
  },
  {
    path: 'authentication',
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'account-create', component: RegisterComponent}
    ]
  },
  {
    path: 'client',
    component: ClientHomeComponent,
    canActivate:[AuthenticationGuard],
  children: [
    {
      path: 'products',
      component: ClientProductsComponent
    },
    {
      path: 'my-cart',
      component: ClientCartComponent
    },
    {
      path: 'my-order',
      component: ClientOrdersComponent
    }
  ]
  },
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate:[AuthenticationGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }

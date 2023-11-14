import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ClientProductsComponent } from './client/client-products/client-products.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import { AddToCartComponent } from './client/add-to-cart/add-to-cart.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ClientCartComponent } from './client/client-cart/client-cart.component';
import {MatTableModule} from "@angular/material/table";
import { ClientPurchaseComponent } from './client/client-purchase/client-purchase.component';
import { ClientOrdersComponent } from './client/client-orders/client-orders.component';
import {AdminMainComponent} from "./admin/admin-main/admin-main.component";
import {ProductsComponent} from "./admin/products/products.component";
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { OrdersComponent } from './admin/orders/orders.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ClientHomeComponent,
    ClientProductsComponent,
    AddToCartComponent,
    ClientCartComponent,
    ClientPurchaseComponent,
    ClientOrdersComponent,
      AdminMainComponent,
      ProductsComponent,
      CreateProductComponent,
      UpdateProductComponent,
      OrdersComponent
  ],
    imports: [
        CommonModule,
        ViewRoutingModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatTableModule
    ]
})
export class ViewModule { }

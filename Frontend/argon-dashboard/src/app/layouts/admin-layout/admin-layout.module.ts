import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from '../../pages/users/users.component';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './reducers/user.reducer';
import { ProductsComponent } from '../../pages/products/products.component';
import { AddProductComponent } from '../../pages/add-product/add-product.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ users: UserReducer })
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    UsersComponent,
    ProductsComponent,
    IconsComponent,
    MapsComponent,
    AddProductComponent
  ]
})

export class AdminLayoutModule {}

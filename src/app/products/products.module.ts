import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AddProductsComponent,
    EditProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'', component:ProductsComponent}]),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class ProductsModule {

   constructor() {

    console.log('Products module loaded !!!');

   }
}

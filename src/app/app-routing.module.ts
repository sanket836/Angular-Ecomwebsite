import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CategoryComponent } from './category/category.component';
import { CategoryModule } from './category/category.module';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditProductsComponent } from './products/edit-products/edit-products.component';
import { ProductsComponent } from './products/products.component';
import { SidenvComponent } from './sidenv/sidenv.component';

const routes: Routes = [
      { path:'', redirectTo:'login', pathMatch:'full'},
      //{path:'home', component: HomeComponent},
      { path:'sidenv/products', redirectTo:'products', pathMatch:'full'},
      { path:'sidenv/category', redirectTo:'category', pathMatch:'full'},
      { path:'login', component: LoginComponent},
      { path:'', component: SidenvComponent, canActivate:[AuthGuard],
         children:
          [
             { path:'products', loadChildren:() => import('src/app/products/products.module').then(m => m.ProductsModule) },
             { path:'category', loadChildren:() => import('src/app/category/category.module').then(m => m.CategoryModule)},
             { path:'products/edit/:id', component:EditProductsComponent},
             { path:'category/edit/:id', component:EditCategoryComponent}
          ]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

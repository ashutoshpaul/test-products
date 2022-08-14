import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products/products.component';
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "all",
      },
      {
        path: ":category",
        component: ProductsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

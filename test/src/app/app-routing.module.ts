import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: "cart",
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: "profile",
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule)
  },
  {
    path: "product",
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

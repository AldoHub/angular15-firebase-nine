import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
  {path: "single/:id", loadChildren: () => import("./single/single.module").then(m => m.SingleModule)},
  {path: "create", loadComponent: () => import("./create/create.component").then(m => m.CreateComponent)},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

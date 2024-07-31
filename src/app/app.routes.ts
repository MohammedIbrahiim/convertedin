import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'' , redirectTo:'products', pathMatch:'full' },
    {path:'products' ,loadComponent:()=>import('./feature/products/products.component').then(c=>
        c.ProductsComponent)},
    {path:'product/:id' ,loadComponent:()=>import('./feature/details/details.component').then(c=>
        c.DetailsComponent
    )},
    {path:"**" , redirectTo:"products"}
];

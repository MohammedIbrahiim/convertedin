import { Component, DestroyRef, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductsService } from '../../core/api/products/products.service';
import { Store } from '@ngrx/store';
import { ProductState } from '../../feature/state';
import { selectCartItems } from '../../feature/state/product.selector';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { productAction } from '../../feature/state/product-type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule,AsyncPipe],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})
export class AddToCartComponent implements OnInit {
  cartItems$: Observable<any>|undefined;
  cart$: Observable<any[]>|undefined;
  constructor(private _ProductsService:ProductsService , private store: Store<{ product: ProductState }>,private __destroyRef: DestroyRef){
    this.cartItems$ = this.store.select(selectCartItems);

  }

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCartItems);



  }
  visible= this._ProductsService.visible
  showDialog() {
    this._ProductsService.setVisible(false)
  }

  removeFromCart(productId: number) {
    this.store.dispatch(productAction.removeFromCart({ productId }));
    this.cart$?.subscribe((res=>{
      
    }))
        
  }

  

}

import { Component, DestroyRef, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductsService } from '../../core/api/products/products.service';
import { Store } from '@ngrx/store';
import { ProductState } from '../../feature/state';
import { selectCartItems } from '../../feature/state/product.selector';
import { map, Observable, tap } from 'rxjs';
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
  totalPrice$: Observable<number>|undefined;
  visible= this._ProductsService.visible

  constructor(private _ProductsService:ProductsService , private store: Store<{ product: ProductState }>,private __destroyRef: DestroyRef){
    this.cartItems$ = this.store.select(selectCartItems);
  this.totalPrice$ = this.cartItems$.pipe(
    map(products => products.reduce((total: any, product: { price: any; }) => total + product.price, 0)),
    takeUntilDestroyed(__destroyRef)
  );

  }

  ngOnInit(): void {
    this.store.dispatch(productAction.clearCart());
    this.cart$ = this.store.select(selectCartItems);
  }
  showDialog() {
    this._ProductsService.setVisible(false)
  }


}

import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { ProductState } from '../state/reducer';
import { productAction } from '../state/product-type';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  product$: Observable<any>;
  img: string = '';
  cartArray: any[] = [];
  proObj: any;
  cartItems$: Observable<any> | undefined;
  constructor(
    private route: ActivatedRoute,
    private store: Store<{ product: ProductState }>,
    private __destroyRef: DestroyRef
  ) {
    this.product$ = this.store.pipe(
      select((state) => state.product.selectedProduct)
    );
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(productAction.loadProductDetails({ id }));
    this.product$
      .pipe(
        tap((product) => (this.proObj = product)),
        map((products) => products.images),
        tap((image) => (this.img = image[0])),
        takeUntilDestroyed(this.__destroyRef)
      )
      .subscribe();
  }
  getImgSrc(img: string) {
    this.img = img;
  }

  addToCart(product: any) {
    this.store.dispatch(productAction.addToCart({ product }));
  }
}

import { Component, DestroyRef, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { select,Store } from '@ngrx/store';
import { productAction } from '../../feature/state/product-type';
import { ProductState} from '../../feature/state/reducer'
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { selectSearchResults } from '../../feature/state/product.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

selectSearchResults
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [PaginatorModule,AsyncPipe,UpperCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  first: number = 0;
  rows: number = 10;  
  categoryName:string = ''

  data$: Observable<any> | undefined;
  page$: Observable<number>| undefined;
  row$: Observable<number>| undefined;
  searchResults$: Observable<any>| undefined;



constructor(private _store: Store<{ product: ProductState }> , private _router:Router , private __destroyRef: DestroyRef) {
  this.data$ = this._store.pipe(select(state => state.product));
  this.page$ = this._store.pipe(select(state => state.product.page));
  this.row$ = this._store.pipe(select(state => state.product.row));
  this.searchResults$ = this._store.pipe(select(selectSearchResults));
}

ngOnInit(): void {
  this.data$?.pipe(
    map(products => products.filter),
    tap(filter => this.categoryName =filter),
    takeUntilDestroyed(this.__destroyRef)
  ).subscribe();

  this.loadData()

}



loadData(): void {
  const cacheTime = this._store.pipe(select(state => state.product.cacheTime));
  const now = new Date().getTime();

  cacheTime.subscribe(time => {
    if (!time || now - time >= 15 * 60 * 1000) {
      this._store.dispatch(productAction.loadData({page:this.first,row:this.rows,filter:'smartphones'}));
    }
  });
}



  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this._store.dispatch(productAction.setPage({ page: event.first,row:event.rows }));
    this.loadData();
}

details(id:number){
  console.log(id);
  
  this._router.navigate([`/product/${id}`])

}
}


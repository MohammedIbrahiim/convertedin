import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { productAction } from './product-type';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/index';
import { AppState } from '../../reducers';

@Injectable()
export class CacheEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<ProductState>

  ) {}


  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(productAction.loadData),
    withLatestFrom(this.store.select('product')),
    mergeMap(([action, cacheState]) => {
      const url = `https://dummyjson.com/products/category/${cacheState.filter}?limit=${cacheState.row}&skip=${cacheState.page}`

      return this.http.get(url).pipe(
        map(data => productAction.loadDataSuccess({ data })),
        tap(() => productAction.updateCacheTime({ timestamp: new Date().getTime() })),
        catchError(error => of(productAction.loadDataFailure({ error })))
      );
    })
  ));

  loadProductDetails$ = createEffect(() => this.actions$.pipe(
    ofType(productAction.loadProductDetails),
    mergeMap(action =>
      this.http.get(`https://dummyjson.com/products/${action.id}`).pipe(
        map(product => productAction.loadProductDetailsSuccess({ product })),
        catchError(error => of(productAction.loadProductDetailsFailure({ error })))
      )
    )
  ));


  

  }
  



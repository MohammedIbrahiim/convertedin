import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://dummyjson.com/products/category';
  visible = new BehaviorSubject<boolean>(false);
  visible$ = this.visible.asObservable();

  setVisible(val: boolean) {
    this.visible.next(val);
  }

  getAllCategory(): Observable<any> {
    return this._HttpClient.get('https://dummyjson.com/products/categories');
  }
}
